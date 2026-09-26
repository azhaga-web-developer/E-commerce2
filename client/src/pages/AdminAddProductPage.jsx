import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminChrome from '../components/AdminChrome.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { apiUrl } from '../api.js';

function AdminAddProductPage() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadedImage, setUploadedImage] = useState('');
  const [imageError, setImageError] = useState('');

  const chooseImage = (event) => {
    const file = event.target.files?.[0];
    setImageError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) { setImageError('Choose an image file.'); return; }
    if (file.size > 12 * 1024 * 1024) { setImageError('Choose an image smaller than 12 MB.'); return; }
    const reader = new FileReader();
    reader.onerror = () => setImageError('This image could not be read. Please choose another file.');
    reader.onload = () => {
      const image = new Image();
      image.onerror = () => setImageError('This image could not be opened. Please choose another file.');
      image.onload = () => {
        const scale = Math.min(1, 1400 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(image.width * scale));
        canvas.height = Math.max(1, Math.round(image.height * scale));
        const context = canvas.getContext('2d');
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const data = canvas.toDataURL('image/jpeg', 0.82);
        if (data.length > 7_500_000) { setImageError('This image is still too large after compression. Choose a smaller image.'); return; }
        setUploadedImage(data);
      };
      image.src = String(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setSaving(true);
    const form = new FormData(event.currentTarget);
    const product = {
      name: form.get('name').trim(),
      brand: form.get('brand').trim(),
      categoryName: form.get('categoryName').trim(),
      description: form.get('description').trim(),
      image: uploadedImage || form.get('image').trim(),
      price: Number(form.get('price')),
      originalPrice: form.get('originalPrice') ? Number(form.get('originalPrice')) : undefined,
      stock: Number(form.get('stock')),
      colors: form.get('colors').split(',').map((value) => value.trim()).filter(Boolean),
      sizes: form.get('sizes').split(',').map((value) => value.trim()).filter(Boolean),
      isActive: true
    };
    if (!product.image) {
      setError('Upload a product image or enter an image URL.');
      setSaving(false);
      return;
    }
    try {
      const response = await fetch(apiUrl('/api/products'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(product)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Could not save this product. Check the required fields and try again.');
      navigate('/admin/products', { replace: true, state: { message: 'Product added to the catalog.' } });
    } catch (saveError) {
      setError(saveError.message);
    } finally {
      setSaving(false);
    }
  };

  return <AdminChrome active="Add Product"><form onSubmit={submit}>
    <div className="editor-heading"><div><span className="admin-breadcrumb">Products &nbsp;›&nbsp; Add New Product</span><h1>Add New Product</h1><p>Enter the product details that customers will see in the shop.</p></div><div className="title-actions"><Link to="/admin/products">Cancel</Link><button className="publish-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Add Product'}</button></div></div>
    <div className="editor-layout editor-layout-single"><main>
      <EditorSection title="Basic information" hint="REQUIRED"><label>Product title<input name="name" placeholder="Example: Everyday Running Shoes" minLength="2" required /></label><div className="editor-two-fields"><label>Brand<input name="brand" placeholder="Brand name" required /></label><label>Category<input name="categoryName" placeholder="Footwear, Apparel, Electronics…" required /></label></div><label>Product description<textarea name="description" rows="5" placeholder="Describe the product" required /></label></EditorSection>
      <EditorSection title="Product image"><label>Upload from your computer<input type="file" accept="image/*" onChange={chooseImage} /></label><small>Choose an image up to 12 MB. It will be resized and compressed before saving.</small>{uploadedImage && <img className="product-upload-preview" src={uploadedImage} alt="Selected product preview" />}<label>Or use an image URL<input name="image" type="url" placeholder="https://example.com/product-image.jpg" /></label>{imageError && <p className="auth-error" role="alert">{imageError}</p>}</EditorSection>
      <EditorSection title="Price and inventory"><div className="editor-three-fields"><label>Price (₹)<input name="price" type="number" min="0" step="0.01" required /></label><label>Original price (₹)<input name="originalPrice" type="number" min="0" step="0.01" /></label><label>Quantity in stock<input name="stock" type="number" min="0" step="1" defaultValue="0" required /></label></div></EditorSection>
      <EditorSection title="Options"><label>Colors<input name="colors" placeholder="Black, White, Navy" /></label><label>Sizes<input name="sizes" placeholder="S, M, L, XL" /></label></EditorSection>
      {error && <p className="auth-error" role="alert">{error}</p>}
      <div className="title-actions"><Link to="/admin/products">Cancel</Link><button className="publish-button" type="submit" disabled={saving}>{saving ? 'Saving…' : 'Add Product'}</button></div>
    </main></div>
  </form></AdminChrome>;
}

function EditorSection({ title, hint, children }) {
  return <section className="editor-section"><header><h2>{title}</h2>{hint && <span>{hint}</span>}</header>{children}</section>;
}

export default AdminAddProductPage;
