import Image from "next/image";

export const Logo = (): JSX.Element => {
    return (
        <Image
            height={30}
            width={30}
            alt="Dashboard logo image"
            src="/logoipsum-223.svg"
        />
    )
}