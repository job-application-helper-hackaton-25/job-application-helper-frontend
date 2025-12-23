import React, {useState, useEffect} from "react";
import {getOffers, getOffersStatuses} from "../api/offersApi-real.js";
import OfferCard from "../components/OfferCard";
import OfferDetails from "../components/OfferDetails";
import Header from "../components/Header";

import {
    DndContext,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter,
} from "@dnd-kit/core";
import {
    SortableContext,
    arrayMove,
    horizontalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import { NOTE_STAGE_COLORS } from "../constants/StageColors.jsx";

// const STATUS_COLUMNS = [
//     "SAVED",
//     "APPLIED",
//     "HR INTERVIEW",
//     "TECHNICAL INTERVIEW",
//     "OFFER",
//     "DECISION",
// ];

export default function Dashboard() {
    const userId = "123";
    const [offers, setOffers] = useState([]);
    const [offersStatuses, setOffersStatuses] = useState([]);
    const [selectedOffer, setSelectedOffer] = useState(null);

    function SortableOffer({offer}) {
        const {attributes, listeners, setNodeRef, transform, transition} =
            useSortable({id: offer.id});

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-white p-4 rounded-lg shadow cursor-pointer flex items-center justify-center h-32 text-gray-900 mb-2"
                onClick={() => {
                    setSelectedOffer(offer);
                }}>
                <OfferCard offer={offer}/>
            </div>
        );
    }

    useEffect(() => {
        getOffers().then(setOffers);
        getOffersStatuses().then(setOffersStatuses);
    }, []);

    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {distance: 15}})
    );

    const onDragEnd = (event) => {
        const {active, over} = event;
        if (!over) return;

        if (active.id !== over.id) {
            setOffers((prev) => {
                const oldIndex = prev.findIndex((o) => o.id === active.id);
                const newIndex = prev.findIndex((o) => o.id === over.id);
                return arrayMove(prev, oldIndex, newIndex);
            });
        }
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <Header/>

            <div className="flex-1 overflow-x-auto p-4 flex gap-4">
                {offersStatuses.map((status) => (
                    <div
                        key={status.value}
                        className={`flex-shrink-0 flex-1 bg-gray-100 shadow rounded-lg flex flex-col h-full`}>
                        <h2 className={`text-lg text-gray-700 font-semibold mb-2 py-1 rounded-t-lg border-t-5 ${NOTE_STAGE_COLORS[status.value].border}`}>
                            {status.label}
                        </h2>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={onDragEnd}
                        >
                            <SortableContext
                                items={offers.filter((o) => o.status === status.value).map((o) => o.id)}
                                strategy={horizontalListSortingStrategy}
                            >
                                <div className="flex flex-col gap-2 m-2">
                                    {offers
                                        .filter((o) => o.status === status.value)
                                        .map((offer) => (
                                            <SortableOffer
                                                key={offer.id}
                                                offer={offer}
                                            />
                                        ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    </div>
                ))}
            </div>

            {selectedOffer && (
                <OfferDetails
                    offer={selectedOffer}
                    onClose={() => {
                        setSelectedOffer(null)
                    }}
                />
            )}
        </div>
    );
}
