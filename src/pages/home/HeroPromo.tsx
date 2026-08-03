import expressGlow from '../../assets/home/hero-express-glow.svg';
import expressLightning from '../../assets/home/hero-express-lightning.svg';
import expressMascot from '../../assets/home/hero-express-mascot.webp';
import expressSlogan from '../../assets/home/hero-express-slogan.svg';
import heroGlow from '../../assets/home/hero-art-glow.svg';
import heroLightning from '../../assets/home/hero-art-lightning.svg';
import heroMascot from '../../assets/home/hero-art-mascot.webp';
import heroSlogan from '../../assets/home/hero-slogan.svg';
import type { ServiceMode } from '../../data/models/order';

interface HeroPromoProps {
  mode: ServiceMode;
}

/**
 * 首页运营视觉区(1674:33162 / 1674:33163)。
 * 文案左锚定、插画右锚定，屏幕变宽时只扩大两者之间的留白。
 */
export function HeroPromo({ mode }: HeroPromoProps) {
  const isExpress = mode === 'express';

  return (
    <div className="relative h-[109px] shrink-0">
      {isExpress ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[131px] right-[-92px] h-[320px] w-[262px] max-[374px]:origin-right max-[374px]:scale-[0.86]"
        >
          <img
            src={expressGlow}
            alt=""
            className="absolute top-[-57.81px] left-[-114.81px] h-[504.6px] w-[504.6px] max-w-none"
          />
          <img
            src={expressLightning}
            alt=""
            className="absolute top-0 left-[26px] h-[243.571px] w-[171.519px] max-w-none"
          />
          <span className="absolute top-[119px] left-0 h-[132px] w-[178px] overflow-hidden">
            <img
              src={expressMascot}
              alt=""
              width={420}
              height={280}
              fetchPriority="high"
              decoding="async"
              className="absolute top-[3.3px] left-[-9.35px] h-[134.2px] w-[201.1px] max-w-none"
            />
          </span>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-[132px] right-[-92px] h-[320px] w-[254px] max-[374px]:origin-right max-[374px]:scale-[0.86]"
        >
          <img
            src={heroGlow}
            alt=""
            className="absolute top-[-56.8px] left-[-122.8px] h-[504.6px] w-[504.6px] max-w-none"
          />
          <span className="absolute top-[123px] left-0 h-[120px] w-[162px] overflow-hidden">
            <img
              src={heroMascot}
              alt=""
              width={600}
              height={360}
              fetchPriority="high"
              decoding="async"
              className="absolute top-[-0.1px] left-[-114.47px] h-[177.19px] w-[294.48px] max-w-none"
            />
          </span>
          <img
            src={heroLightning}
            alt=""
            className="absolute top-0 left-[18px] h-[243.571px] w-[171.519px] max-w-none"
          />
        </div>
      )}

      <img
        key={isExpress ? 'express' : 'standard'}
        src={isExpress ? expressSlogan : heroSlogan}
        alt={isExpress ? '专人取送，安心速达' : '一小时，全城送'}
        className={`home-hero-slogan-slide-left absolute top-[15px] -left-[3px] z-10 h-[84px] max-w-none ${
          isExpress ? 'w-[254px]' : 'w-[218px]'
        }`}
      />
    </div>
  );
}
