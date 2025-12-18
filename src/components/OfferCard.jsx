import React from "react";

export default function OfferCard({ offer }) {
    return (
        <div className="flex items-center gap-4 p-2">
            <img
                src={offer.logoUrl}
                alt={offer.companyId}
                className="w-12 h-12 object-contain flex-shrink-0 rounded-3xl"
            />

            <div className="flex flex-col text-left">
                <div className="text-sm font-bold">{offer.jobTitle}</div>
                <div className="text-xs text-gray-500">{offer.companyId}</div>
                <div className="text-xs text-gray-400">
                    {offer.employmentType} • {offer.workType}
                </div>
            </div>
        </div>
    );
}

