export default function OfferCard({ offer }) {
    return (
        <div className="flex items-center gap-4 p-2">
            <img
                src={offer.companyImage}
                alt={offer.companyName}
                className="w-12 h-12 object-contain flex-shrink-0 rounded-2xl bg-white"
            />

            <div className="flex flex-col text-left">
                <div className="text-sm font-semibold text-gray-900">
                    {offer.position.length > 15
                        ? offer.position.slice(0, 15) + "…"
                        : offer.position}
                </div>

                <div className="text-xs text-gray-600">
                    {offer.companyName}
                </div>

                <div className="text-xs text-gray-400">
                    {offer.jobType.length > 10
                        ? offer.jobType.slice(0, 10) + "…"
                        : offer.jobType} • {offer.agreementType.length > 10
                    ? offer.agreementType.slice(0, 10) + "…"
                    : offer.agreementType}
                </div>
            </div>
        </div>
    );
}
