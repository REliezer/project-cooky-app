import { type JSX } from 'react';
import type { FeatureSectionProps } from '../../types';

export default function FeatureSection({ title, description, icon }: FeatureSectionProps): JSX.Element {
    return (
        <div className="text-center p-6 border rounded-2xl">
            <div className="mb-4">{icon}</div>
            <h3 className="mb-2">{title}</h3>
            <p>
                {description}
            </p>
        </div>
    )
}
