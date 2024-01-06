import { Stepper } from "@repo/ui/components/stepper";

type Props = {
  steps: string[];
  activeStep: number;
};

export default function CheckoutSteps({ steps, activeStep }: Props) {
  return (
    <div className="h-28 px-4 md:px-16 lg:px-32">
      <Stepper steps={steps} activeStep={activeStep} />
    </div>
  );
}
