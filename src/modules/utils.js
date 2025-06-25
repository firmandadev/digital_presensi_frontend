// module.js - Web Crypto API based encryption/decryption (URL-safe)

export async function encrypt(text, password) {
  const enc = new TextEncoder();
  const pwUtf8 = enc.encode(password);
  const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const alg = { name: 'AES-GCM', iv: iv };
  const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']);
  const ctBuffer = await crypto.subtle.encrypt(alg, key, enc.encode(text));
  const ctArray = new Uint8Array(ctBuffer);
  const ctStr = btoa(String.fromCharCode(...ctArray));
  const ivStr = btoa(String.fromCharCode(...iv));
  return encodeURIComponent(ivStr + '.' + ctStr); // iv.ciphertext (URL-safe)
}

export async function decrypt(encrypted, password) {
  try {
    const [ivStr, ctStr] = decodeURIComponent(encrypted).split('.');
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    const pwUtf8 = enc.encode(password);
    const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8);
    const iv = Uint8Array.from(atob(ivStr), c => c.charCodeAt(0));
    const alg = { name: 'AES-GCM', iv: iv };
    const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']);
    const ctUint8 = Uint8Array.from(atob(ctStr), c => c.charCodeAt(0));
    const plainBuffer = await crypto.subtle.decrypt(alg, key, ctUint8);
    return dec.decode(plainBuffer);
  } catch (e) {
    return '❌ Gagal dekripsi (password salah atau data rusak)';
  }
}	
