import {
  Avatar as A,
  AvatarFallback,
  AvatarImage,
} from "@radix-ui/react-avatar";

interface AvatarProps {
  src: string;
  name: string;
  alt?: string;
  className?: string;
}

const Avatar = ({
  src = "",
  name = "",
  alt = "",
  className = "",
}: AvatarProps) => {
  return (
    <A className={className}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{name}</AvatarFallback>
    </A>
  );
};

export default Avatar;
