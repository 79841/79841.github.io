import Image from "next/image";
import type { Work } from "@/shared/lib/profile";

interface WorkThumbProps {
  work: Work;
  /** 뷰포트 초입에 놓이는 이미지는 LCP가 되기 쉽다 — 지연 로딩을 끈다 */
  priority?: boolean;
  /** 썸네일 비율 — 카드는 4/3, 대표 카드는 넓게 */
  className?: string;
}

/**
 * 카드 썸네일 — 유리 카드 안의 이미지 슬롯. 글자는 얹지 않고 카드 밖 아래에 둔다.
 * 폰 스크린샷은 크롭하지 않고 매트 위에 두 장을 나란히 세운다.
 */
export function WorkThumb({ work, priority, className = "aspect-[4/3]" }: WorkThumbProps) {
  return (
    <div className={`thumb ${className}`}>
      {work.phone ? (
        <PhoneMat work={work} priority={priority} />
      ) : (
        <Cover work={work} priority={priority} />
      )}
    </div>
  );
}

function Cover({ work, priority }: { work: Work; priority?: boolean }) {
  const image = work.images[0];
  return (
    <Image
      src={image.src}
      alt={`${work.name} 화면`}
      width={image.width}
      height={image.height}
      className="cover"
      priority={priority}
    />
  );
}

function PhoneMat({ work, priority }: { work: Work; priority?: boolean }) {
  const [first, second] = work.images;
  return (
    <>
      <div aria-hidden className="phone-mat absolute inset-0" />
      <div className="absolute inset-x-0 top-[8%] flex justify-center gap-[5%]">
        <Image
          src={first.src}
          alt={`${work.name} 화면`}
          width={first.width}
          height={first.height}
          className="w-[34%] rounded-[12px] shadow-[0_18px_36px_-16px_rgb(23_23_26/0.45)]"
          priority={priority}
        />
        {second ? (
          <Image
            src={second.src}
            alt={`${work.name} 화면`}
            width={second.width}
            height={second.height}
            className="w-[34%] translate-y-[8%] rounded-[12px] shadow-[0_18px_36px_-16px_rgb(23_23_26/0.45)]"
            priority={priority}
          />
        ) : null}
      </div>
    </>
  );
}
