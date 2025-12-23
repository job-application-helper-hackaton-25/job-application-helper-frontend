import React, { useState, useEffect } from "react";
import { getOffers, getOffersStatuses, updateOfferStatuses } from "../api/offersApi-real.js";
import OfferCard from "../components/OfferCard";
import OfferDetails from "../components/OfferDetails";
import Header from "../components/Header";

import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
    useDroppable,
    DragOverlay,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { NOTE_STAGE_COLORS } from "../constants/StageColors.jsx";

export default function Dashboard() {
    const [offers, setOffers] = useState([]);
    const [offersStatuses, setOffersStatuses] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);
    const [activeId, setActiveId] = useState(null);

    useEffect(() => {
        getOffers().then(setOffers);
        getOffersStatuses().then(setOffersStatuses);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const onDragStart = ({ active }) => setActiveId(active.id);

    const onDragEnd = ({ active, over }) => {
        setActiveId(null);
        if (!over) return;

        const offerId = active.id;
        const newStatus = over.data.current?.status;
        if (!newStatus) return;

        setOffers(prev =>
            prev.map(o =>
                o.id === offerId ? { ...o, status: newStatus } : o
            )
        );

        updateOfferStatuses(offerId, newStatus).catch(err =>
            console.error("Failed to update offer status", err)
        );
    };

    function SortableOffer({ offer, activeId }) {
        const { attributes, listeners, setNodeRef, transform, transition } =
            useSortable({ id: offer.id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: activeId === offer.id ? 0.5 : 1, // <-- półprzezroczysty gdy przeciągany
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-white p-4 rounded-lg shadow cursor-pointer flex items-center justify-center h-32 text-gray-900 mb-2"
                onClick={() => setSelectedOffer(offer)}
            >
                <OfferCard offer={offer} />
            </div>
        );
    }

    function StatusColumn({ status, children }) {
        const { setNodeRef } = useDroppable({
            id: status.value,
            data: { status: status.value },
        });

        return (
            <div
                ref={setNodeRef}
                className="flex flex-col gap-2 m-2 bg-gray-100 p-2 rounded-lg"
            >
                {children}
            </div>
        );
    }

    return (
        <div className="h-screen w-screen flex flex-col">
            <Header />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
            >
                <div className="flex-1 overflow-x-auto p-4 flex gap-4">
                    {offersStatuses.map(status => {
                        const offersInStatus = offers.filter(o => o.status === status.value);

                        return (
                            <div
                                key={status.value}
                                className="flex-shrink-0 flex-1 bg-gray-100 shadow rounded-lg flex flex-col h-full"
                            >
                                <h2
                                    className={`text-lg text-gray-700 font-semibold mb-2 py-1 rounded-t-lg border-t-5 ${NOTE_STAGE_COLORS[status.value].border}`}
                                >
                                    {status.label}
                                </h2>

                                <StatusColumn status={status}>
                                    <SortableContext
                                        items={offersInStatus.map(o => o.id)}
                                        strategy={verticalListSortingStrategy}
                                    >
                                        {offersInStatus.map(offer => (
                                            <SortableOffer key={offer.id} offer={offer} activeId={activeId} />
                                        ))}
                                    </SortableContext>
                                </StatusColumn>
                            </div>
                        );
                    })}
                </div>

                <DragOverlay>
                    {activeId ? (() => {
                        const offer = offers.find(o => o.id === activeId);
                        if (!offer) return null;
                        return (
                            <div className="bg-white p-4 rounded-lg shadow cursor-pointer flex items-center justify-center h-32 text-gray-900 mb-2">
                                <OfferCard offer={offer} />
                            </div>
                        );
                    })() : null}
                </DragOverlay>
            </DndContext>

            {selectedOffer && (
                <OfferDetails
                    offer={selectedOffer}
                    onClose={() => setSelectedOffer(null)}
                />
            )}
        </div>
    );
}
