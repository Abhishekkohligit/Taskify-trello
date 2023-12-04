import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { shildren: React.ReactNode }) => {
	return <ClerkProvider>{children}</ClerkProvider>;
};

export default PlatformLayout;
