import Image from "next/image";

type LogoProps = {
  isLarge?: boolean;
};

const Logo = ({ isLarge = false }: LogoProps) => {
  const width = isLarge ? 200 : 160;
  const height = isLarge ? 64 : 51;

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
