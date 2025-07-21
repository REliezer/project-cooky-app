import type { JSX } from 'react';
import Button from "./Button";
import type { PlanCardProps } from "../../types/components";

const CheckIcon = (): JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        viewBox="0 0 24 24"
        className="flex-shrink-0 mt-0.5"
        aria-hidden="true"
    >
        <circle cx="12" cy="12" r="12" fill="#461604" />
        <path
            d="M7 12.5l3 3 7-7"
            stroke="#FFF8EC"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

function PlanCard({ plan, onPlanSelect }: PlanCardProps): JSX.Element {
    return (
        <div className="bg-bg-secondary border-2 rounded-lg shadow-lg p-6 max-w-[350px] mx-auto mb-8">
            <div className="flex flex-col items-center text-center">
                <h2 className="font-semibold">{plan.planTitle}</h2>
                <h1>{plan.planSubtitle}</h1>
                <p><span className="text-2xl font-extrabold">{plan.planPrice}</span>{` /${plan.planDuration}`}</p>
            </div>
            {
                plan.planFeatures.map((feature: string, index: number) => (
                    <div key={index} className="flex items-start gap-3 mt-2">
                        <CheckIcon />
                        <p className="flex-1 leading-relaxed">{feature}</p>
                    </div>
                ))
            }
            <Button
                label="Seleccionar Plan"
                variant="primary"
                size="medium"
                className="mt-6 w-full"
                onClick={() => onPlanSelect?.(plan)}
                aria-label={`Seleccionar plan ${plan.planTitle}`}
            />
        </div>
    )
}

export default PlanCard;