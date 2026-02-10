import Image from "next/image";

type LogoProps = {
  isLarge?: boolean;
  scale?: number;
};

const Logo = ({ isLarge = false, scale = 1 }: LogoProps) => {
  const baseWidth = isLarge ? 200 : 160;
  const baseHeight = isLarge ? 64 : 51;
  const width = Math.round(baseWidth * scale);
  const height = Math.round(baseHeight * scale);

  return (
    <div className="flex items-center">
      <Image
        src="/logo/prochat_logo_light.png"
        width={width}
        height={height}
        alt="ProChat logo"
        className="block h-auto w-auto dark:hidden"
        priority={isLarge}
      />
      <Image
        src="/logo/prochat_logo_dark.png"
        width={width}
        height={height}
        alt="ProChat logo"
        className="hidden h-auto w-auto dark:block"
        priority={isLarge}
      />
    </div>
  );
};

export default Logo;
