import { FC, ReactNode } from "react";
import { Header } from "./presentation/header";
import { Footer } from "./presentation/Footer";
const LayoutWorkflowWizard: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <main className="flex gap-8 flex-col">
      <Header />
      {children}
      <Footer />
    </main>
  );
};

export default LayoutWorkflowWizard;
