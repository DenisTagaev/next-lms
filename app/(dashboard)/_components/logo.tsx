import Image from "next/image";

export const Logo = () => {
    return (
        <Image
            height={30}
            width={30}
            alt="Dashboard logo image"
            src="./logoipsum-223.svg"
        />
    )
}