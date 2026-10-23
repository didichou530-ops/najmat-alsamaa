import React from 'react';
import { Product, Shade } from '../types';
import { MEDIA_VERSION } from '../data/mediaVersion';
import { brandPlaque } from '../utils/localize';

interface ProductVisualProps {
  product: Product;
  selectedShade?: Shade;
  className?: string;
  showBadges?: boolean;
  interactive?: boolean;
  /** تجاوز صورة المنتج (لل معرض في نافذة التفاصيل) */
  imageUrl?: string;
}

/** يحوّل مسار الصورة المخزّن إلى رابط قابل للتحميل (مراعي مسار الأساس + الكاش). */
export const resolveMediaUrl = (path?: string): string => {
  if (!path) return '';
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path;
  const base = import.meta.env.BASE_URL || '/';
  const clean = path.replace(/^\//, '');
  return `${base.replace(/\/$/, '')}/${clean}?v=${MEDIA_VERSION}`;
};

const hexToRgb = (hex: string): [number, number, number] => {
  const clean = (hex || '#C87D65').replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const num = parseInt(full, 16);
  if (Number.isNaN(num)) return [200, 125, 101];
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
};

const rgba = (hex: string, alpha: number): string => {
  const [r, g, b] = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** مزج لونين hex بنسبة (0 = الأول، 1 = الثاني). */
const mixHex = (a: string, b: string, ratio: number): string => {
  const [r1, g1, b1] = hexToRgb(a);
  const [r2, g2, b2] = hexToRgb(b);
  const m = (x: number, y: number) => Math.round(x + (y - x) * ratio);
  return `#${[m(r1, r2), m(g1, g2), m(b1, b2)]
    .map((v) => v.toString(16).padStart(2, '0'))
    .join('')
    .toUpperCase()}`;
};

/** يحوّل تدرّج Tailwind (from-[#FFF] to-[#EEE]) إلى تدرّج CSS. */
const gradientToCss = (bgGradient?: string): string | undefined => {
  if (!bgGradient) return undefined;
  const colors = bgGradient.match(/#[0-9A-Fa-f]{6}/g);
  if (!colors || colors.length < 2) return undefined;
  return `linear-gradient(145deg, ${colors[0]} 0%, ${colors[1]} 100%)`;
};

/** مِرقعة (plaque) Maison: اسم العلامة + الحجم — تُستخدم مع الصور الحقيقية. */
const volumeLabel = (volume?: string): string =>
  volume ? volume.replace(/\s+/g, ' ').trim().toUpperCase() : '';

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  selectedShade,
  className = '',
  showBadges = true,
  interactive = true,
  imageUrl
}) => {
  const [imageFailed, setImageFailed] = React.useState(false);
  const currentShadeHex = selectedShade ? selectedShade.hex : product.shades?.[0]?.hex || product.accentColor;
  const mediaSrc = resolveMediaUrl(imageUrl || product.image);
  const hasPhoto = Boolean(mediaSrc) && !imageFailed;
  const accent = product.accentColor || '#C87D65';

  // إعادة الضبط عند تغيير المنتج
  React.useEffect(() => {
    setImageFailed(false);
  }, [imageUrl, product.image]);

  return (
    <div
      className={`relative overflow-hidden flex items-center justify-center select-none ${className}`}
      style={{
        background: hasPhoto
          ? `radial-gradient(circle at 50% 26%, #FFFFFF 0%, ${mixHex(accent, '#F5EDE6', 0.80)} 56%, ${mixHex(accent, '#EADBCE', 0.68)} 100%)`
          : `radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F5EDE6 60%, #EADBCE 100%)`
      }}
    >
      {/* Background soft ambient luxury halo */}
      <div
        className="absolute w-44 h-44 rounded-full blur-2xl opacity-60 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: hasPhoto ? rgba(accent, 0.20) : currentShadeHex }}
      />

      {/* ── المنتج الحقيقي: قصّة شفافة + ظلّ أرضي + انعكاس (Studio Render) ── */}
      {hasPhoto && (
        <div className="relative z-10 flex items-center justify-center w-full h-full p-3 sm:p-5">
          <img
            src={mediaSrc}
            alt={product.name}
            loading="lazy"
            decoding="async"
            onError={() => setImageFailed(true)}
            className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}

      {/* ── بديل عند تعذّر تحميل الصورة (قارورة فاخرة بدل صورة مكسورة) ──── */}
      {mediaSrc && imageFailed && (
        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-8 h-8 rounded-t-md shadow-xs border-b border-black/20 flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #FFF3B0 50%, #9C6F3B 100%)' }}>
            <div className="w-4 h-1 bg-white/50 rounded-full" />
          </div>
          <div className="relative w-22 h-36 rounded-b-2xl border border-white/70 shadow-xl overflow-hidden backdrop-blur-md flex flex-col items-center justify-between p-2.5"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.85) 0%, ${currentShadeHex} 70%)`,
              boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.8), 0 16px 28px rgba(28,25,23,0.12)'
            }}>
            <div className="absolute top-0 left-2 w-2.5 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
            <div className="mt-4 px-2 py-1.5 bg-white/95 rounded shadow-xs text-center border border-black/5 w-18">
              <span className="block text-[7px] tracking-[0.2em] font-serif uppercase text-[#1C1917] font-bold truncate">
                Maison Nour
              </span>
              <span className="block text-[6px] tracking-wider text-stone-600 uppercase font-sans truncate">
                {brandPlaque(product)}
              </span>
            </div>
            <div className="text-[7px] font-mono tracking-tight text-stone-700 bg-white/70 px-2 py-0.5 rounded-full">
              {product.volume || '50 ml'}
            </div>
          </div>
          <div className="w-24 h-3 bg-[#1C1917]/10 rounded-full blur-xs mt-1" />
        </div>
      )}

      {/* Product-Specific Editorial Renderings */}
      {product.id === 'prod-luminous-silk-foundation' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          {/* Foundation Cap & Pump */}
          <div className="w-9 h-11 bg-gradient-to-r from-[#D4AF37] via-[#FFF3B0] to-[#AA8220] rounded-t-sm shadow-sm flex items-center justify-center border-b border-[#8A6715]">
            <div className="w-5 h-2 bg-[#1C1917]/20 rounded-full" />
          </div>
          <div className="w-6 h-3 bg-[#1C1917]" />
          {/* Glass Bottle with selected shade liquid */}
          <div className="relative w-24 h-36 rounded-b-2xl border border-white/60 shadow-xl overflow-hidden backdrop-blur-md flex flex-col items-center justify-between p-2.5 transition-colors duration-500"
            style={{
              backgroundColor: currentShadeHex,
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7), 0 16px 30px rgba(28,25,23,0.14)'
            }}
          >
            {/* Glass reflection streak */}
            <div className="absolute top-0 left-2 w-3 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 pointer-events-none" />
            
            {/* Luxury Label */}
            <div className="mt-4 px-2 py-1 bg-white/95 rounded shadow-xs text-center border border-black/5 w-20">
              <span className="block text-[8px] tracking-[0.2em] font-serif uppercase text-[#1C1917] font-semibold">
                Maison Nour
              </span>
              <span className="block text-[6.5px] tracking-wider text-[#78716C] uppercase font-sans">
                L'Éclat Silk
              </span>
            </div>

            {/* Bottom Volume & Shade Indicator */}
            <div className="text-[7.5px] font-mono tracking-tight text-white/90 bg-black/30 px-2 py-0.5 rounded-full backdrop-blur-xs font-medium">
              {selectedShade ? selectedShade.name.split(' ')[0] : '30 ML'} · SPF 25
            </div>
          </div>
          {/* Surface Shadow */}
          <div className="w-28 h-3 bg-[#1C1917]/10 rounded-full blur-xs mt-1" />
        </div>
      )}

      {product.id === 'prod-cellular-serum' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          {/* Pipette Dropper Bulb */}
          <div className="w-7 h-5 bg-[#1C1917] rounded-t-full shadow-xs" />
          <div className="w-8 h-4 bg-gradient-to-r from-[#D4AF37] via-[#FFE28A] to-[#A37B1B] border-b border-[#7A560B]" />
          {/* Amber Glass Dropper Bottle */}
          <div className="relative w-22 h-34 rounded-b-xl border border-amber-900/30 shadow-xl overflow-hidden flex flex-col items-center justify-between p-2"
            style={{
              background: 'linear-gradient(135deg, #7C3B0E 0%, #451A03 50%, #B45309 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.4), 0 16px 28px rgba(69,26,3,0.25)'
            }}
          >
            <div className="absolute top-0 left-2 w-2 h-full bg-gradient-to-r from-transparent via-amber-200/30 to-transparent skew-x-12" />
            <div className="mt-4 px-2 py-1 bg-[#FAF7F5] rounded text-center border border-amber-950/10 w-18 shadow-xs">
              <span className="block text-[7.5px] tracking-[0.2em] font-serif uppercase text-[#451A03] font-bold">
                Maison Nour
              </span>
              <span className="block text-[6px] tracking-widest text-[#B45309] uppercase font-sans font-medium">
                24K Nectar
              </span>
            </div>
            <div className="text-[7.5px] font-mono tracking-tight text-amber-200 bg-black/40 px-2 py-0.5 rounded-full">
              Peptides · 30ml
            </div>
          </div>
          <div className="w-24 h-3 bg-amber-950/15 rounded-full blur-xs mt-1" />
        </div>
      )}

      {product.id === 'prod-barrier-cream' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          {/* Brushed Rose-Gold / Terracotta Lid */}
          <div className="w-28 h-6 bg-gradient-to-r from-[#C87D65] via-[#E8B4A2] to-[#9E5742] rounded-t-lg shadow-sm border-b border-[#7E3F2D] flex items-center justify-center">
            <div className="w-14 h-1 bg-white/30 rounded-full" />
          </div>
          {/* Frosted Heavy Glass Jar */}
          <div className="relative w-30 h-22 rounded-b-2xl border border-white/80 shadow-xl overflow-hidden bg-white/70 backdrop-blur-md flex flex-col items-center justify-between p-2"
            style={{
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.9), 0 16px 26px rgba(44,24,16,0.12)'
            }}
          >
            <div className="absolute top-0 right-3 w-3 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12" />
            {/* Whipped Balm Swirl Visual */}
            <div className="w-14 h-4 bg-gradient-to-r from-[#F7ECE4] to-[#EAD6CB] rounded-full shadow-inner mt-1 border border-[#D9C4B8]" />
            <div className="px-2 py-0.5 bg-white/90 rounded text-center border border-black/5 w-24">
              <span className="block text-[7.5px] tracking-[0.2em] font-serif uppercase text-[#1C1917] font-semibold">
                Crème Velours
              </span>
              <span className="block text-[6px] tracking-wider text-[#78716C]">
                5 Ceramides · 50ml
              </span>
            </div>
          </div>
          <div className="w-32 h-3.5 bg-[#1C1917]/10 rounded-full blur-xs mt-1" />
        </div>
      )}

      {product.id === 'prod-dew-resurfacing-essence' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          <div className="w-6 h-10 bg-[#E8DDD7] rounded-t border-b border-[#C2B2AA]" />
          <div className="relative w-20 h-38 rounded-b-lg border border-white/70 shadow-lg bg-gradient-to-b from-white/90 via-[#FDF8F5] to-[#F5EBE6] backdrop-blur-md flex flex-col items-center justify-between p-2"
            style={{ boxShadow: '0 14px 24px rgba(28,25,23,0.08)' }}
          >
            <div className="mt-5 px-1.5 py-1 bg-white/80 rounded border border-black/5 text-center w-16">
              <span className="block text-[7px] tracking-[0.18em] font-serif uppercase text-[#1C1917] font-bold">
                Glow Dew
              </span>
              <span className="block text-[5.5px] text-[#A8715A]">7% Lactic AHA</span>
            </div>
            <div className="text-[7px] font-mono text-[#78716C] bg-white/60 px-1.5 py-0.5 rounded">
              120 ml
            </div>
          </div>
          <div className="w-22 h-3 bg-[#1C1917]/10 rounded-full blur-xs mt-1" />
        </div>
      )}

      {product.id === 'prod-cloud-cleanser' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          {/* Pump Dispenser */}
          <div className="w-7 h-5 bg-[#5E7A60] rounded-t-sm" />
          <div className="w-4 h-3 bg-[#1C1917]" />
          <div className="relative w-22 h-36 rounded-b-xl border border-[#D5E3D2] shadow-lg bg-gradient-to-b from-[#F2F7F1] to-[#E3EFE1] flex flex-col items-center justify-between p-2">
            <div className="mt-4 px-2 py-1 bg-white/90 rounded border border-[#5E7A60]/20 text-center w-18">
              <span className="block text-[7px] font-serif uppercase tracking-widest text-[#2E4530] font-bold">
                Botanical Cloud
              </span>
              <span className="block text-[5.5px] text-[#5E7A60]">Low-pH Melt</span>
            </div>
            <div className="text-[7px] font-mono text-[#2E4530]/80 bg-white/50 px-2 py-0.5 rounded">
              150 ml
            </div>
          </div>
          <div className="w-24 h-3 bg-[#2E4530]/10 rounded-full blur-xs mt-1" />
        </div>
      )}

      {product.id === 'prod-iconic-radiance-trio' && (
        <div className="relative z-10 flex items-center justify-center gap-1 group-hover:scale-105 transition-transform duration-500 scale-95">
          {/* Cleanser miniature */}
          <div className="w-12 h-26 rounded-md bg-gradient-to-b from-[#F2F7F1] to-[#E3EFE1] border border-[#D5E3D2] shadow-md flex flex-col items-center justify-center p-1 -rotate-6">
            <span className="text-[5.5px] font-serif text-[#2E4530] font-bold">Cleanse</span>
          </div>
          {/* Serum Center Hero */}
          <div className="w-14 h-32 rounded-md bg-gradient-to-b from-[#8C4314] to-[#451A03] border border-amber-700/40 shadow-xl flex flex-col items-center justify-between p-1 z-10">
            <div className="w-4 h-2 bg-[#D4AF37] rounded-t-sm" />
            <span className="text-[6.5px] font-serif text-amber-200 font-bold uppercase tracking-wider text-center">
              24K Serum
            </span>
            <div className="w-10 h-0.5 bg-amber-400/40" />
          </div>
          {/* Cream miniature */}
          <div className="w-16 h-18 rounded-md bg-white/80 border border-stone-200 shadow-md flex flex-col items-center justify-center p-1 rotate-6">
            <div className="w-14 h-2 bg-[#C87D65] rounded-t" />
            <span className="text-[6px] font-serif text-[#1C1917] font-semibold mt-1">Crème</span>
          </div>
        </div>
      )}

      {product.id === 'prod-velvet-lip-tint' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          <div className="w-6 h-14 bg-gradient-to-r from-[#9E3D48] via-[#B85D43] to-[#7A2841] rounded-t-md shadow-xs border-b border-black/20" />
          <div className="relative w-8 h-22 rounded-b-md border border-white/60 shadow-lg flex flex-col items-center justify-between p-1 transition-colors duration-300"
            style={{ backgroundColor: currentShadeHex }}
          >
            <div className="w-1.5 h-full bg-white/30 skew-x-12" />
            <span className="text-[6px] tracking-wider font-serif uppercase text-white font-bold mb-1">
              Soufflé
            </span>
          </div>
          <div className="w-10 h-2 bg-[#1C1917]/15 rounded-full blur-xs mt-1" />
        </div>
      )}

      {product.id === 'prod-sensory-body-oil' && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          <div className="w-7 h-6 bg-gradient-to-r from-[#D4AF37] to-[#9C6F3B] rounded-t shadow-xs" />
          <div className="relative w-18 h-34 rounded-b-2xl border border-amber-300/40 shadow-xl bg-gradient-to-b from-[#FFF6E5]/80 via-[#F7E5C3]/90 to-[#E8C58D] backdrop-blur-md flex flex-col items-center justify-between p-2">
            {/* Shimmer flecks */}
            <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:8px_8px] opacity-40 pointer-events-none" />
            <div className="mt-4 px-1.5 py-1 bg-white/90 rounded border border-amber-900/10 text-center w-15 shadow-xs">
              <span className="block text-[6.5px] tracking-widest font-serif uppercase text-[#451A03] font-bold">
                Oud & Rose
              </span>
              <span className="block text-[5.5px] text-[#9C6F3B]">Huile Sèche</span>
            </div>
            <div className="text-[6.5px] font-mono text-[#78350F] bg-white/50 px-1 py-0.5 rounded">
              100 ml
            </div>
          </div>
          <div className="w-22 h-3 bg-amber-950/15 rounded-full blur-xs mt-1" />
        </div>
      )}

      {/* Fallback Luxury Bottle Rendering for Custom / Admin-Created Products */}
      {!mediaSrc && ![
        'prod-luminous-silk-foundation',
        'prod-cellular-serum',
        'prod-barrier-cream',
        'prod-dew-resurfacing-essence',
        'prod-cloud-cleanser',
        'prod-iconic-radiance-trio',
        'prod-velvet-lip-tint',
        'prod-sensory-body-oil'
      ].includes(product.id) && (
        <div className="relative z-10 flex flex-col items-center group-hover:scale-105 transition-transform duration-500">
          {/* Cap */}
          <div
            className="w-8 h-8 rounded-t-md shadow-xs border-b border-black/20 flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #FFF3B0 50%, #9C6F3B 100%)'
            }}
          >
            <div className="w-4 h-1 bg-white/50 rounded-full" />
          </div>
          {/* Glass Flacon */}
          <div
            className="relative w-22 h-36 rounded-b-2xl border border-white/70 shadow-xl overflow-hidden backdrop-blur-md flex flex-col items-center justify-between p-2.5 transition-colors duration-500"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.85) 0%, ${currentShadeHex} 70%)`,
              boxShadow: 'inset 0 2px 5px rgba(255,255,255,0.8), 0 16px 28px rgba(28,25,23,0.12)'
            }}
          >
            {/* Glass reflection */}
            <div className="absolute top-0 left-2 w-2.5 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none" />

            {/* Label */}
            <div className="mt-4 px-2 py-1.5 bg-white/95 rounded shadow-xs text-center border border-black/5 w-18">
              <span className="block text-[7px] tracking-[0.2em] font-serif uppercase text-[#1C1917] font-bold truncate">
                Maison Nour
              </span>
              <span className="block text-[6px] tracking-wider text-stone-600 uppercase font-sans truncate">
                {brandPlaque(product)}
              </span>
            </div>

            {/* Bottom Tag */}
            <div className="text-[7px] font-mono tracking-tight text-stone-700 bg-white/70 px-2 py-0.5 rounded-full backdrop-blur-xs font-medium">
              {product.volume || '50 ml'}
            </div>
          </div>
          {/* Drop shadow */}
          <div className="w-24 h-3 bg-[#1C1917]/10 rounded-full blur-xs mt-1" />
        </div>
      )}

      {/* Subtle Texture Swatch overlay in bottom corner */}
      {selectedShade && !hasPhoto && (
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 px-2 py-1 bg-white/90 backdrop-blur-md rounded-full shadow-xs border border-stone-200/80">
          <span
            className="w-3.5 h-3.5 rounded-full shadow-xs border border-black/10 shrink-0"
            style={{ backgroundColor: selectedShade.hex }}
          />
          <span className="text-[10px] font-medium text-stone-700 tracking-tight whitespace-nowrap">
            {selectedShade.name.split(' ')[0]}
          </span>
        </div>
      )}

      {/* Maison-style plaque: brand wordmark + volume (real photo products) */}
      {hasPhoto && (product.brand || product.volume) && (
        <div className="absolute bottom-2.5 inset-x-2.5 flex items-end justify-between gap-2 pointer-events-none">
          {product.brand && (
            <div className="px-2.5 py-1.5 bg-white/92 backdrop-blur-md rounded-xl shadow-xs border border-stone-200/80 flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full shadow-xs border border-black/10 shrink-0"
                style={{ backgroundColor: accent }}
              />
              <span className="font-serif text-[10px] font-bold uppercase tracking-[0.18em] text-stone-800 leading-none">
                {product.brand}
              </span>
            </div>
          )}
          {product.volume && (
            <span className="px-2.5 py-1 bg-white/85 backdrop-blur-md rounded-full shadow-xs border border-stone-200/70 text-[9.5px] font-mono tracking-tight text-stone-600">
              {volumeLabel(product.volume)}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
