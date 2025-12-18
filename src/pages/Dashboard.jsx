import React, {useEffect, useState} from "react";
import {getOffers} from "../api/offersApi";
import OfferCard from "../components/OfferCard";
import Header from "../components/Header";
import OfferDetails from "../components/OfferDetails";
import {DragDropContext, Droppable, Draggable} from "@hello-pangea/dnd";

const STATUS_COLUMNS = [
    "Saved",
    "Applied",
    "HR Interview",
    "Technical Interview",
    "Offer",
    "Decision"
];

export default function Dashboard() {
    const userId = "123";
    const [offers, setOffers] = useState([]);
    const [selectedOfferId, setSelectedOfferId] = useState(null);

    useEffect(() => {
        getOffers(userId).then(setOffers);
    }, []);

    const onDragEnd = (result) => {
        const {destination, draggableId} = result;
        if (!destination) return;

        setOffers(prev =>
            prev.map(o =>
                o.id === draggableId ? {...o, status: destination.droppableId} : o
            )
        );
    };

    return (
        <div className="h-screen w-screen flex flex-col">
            <Header/>
            <div className="flex-1 overflow-x-auto p-4">
                <DragDropContext onDragEnd={onDragEnd}>
                    <div className="flex flex-row gap-4 h-full">
                        {STATUS_COLUMNS.map(status => (
                            <Droppable droppableId={status} key={status}>
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className="flex-shrink-0 flex-1 bg-gray-100 shadow p-2 rounded-lg flex flex-col h-full"
                                    >
                                        <h2 className="text-lg font-semibold mb-2 text-gray-800">{status}</h2>
                                        <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
                                            {offers
                                                .filter(o => o.status === status)
                                                .map((offer, index) => (
                                                    <Draggable key={offer.id} draggableId={offer.id} index={index}>
                                                        {(provided) => (
                                                            <div
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                ref={provided.innerRef}
                                                                className="bg-white p-4 rounded-lg shadow cursor-pointer flex items-center justify-center h-32 text-gray-900"
                                                                onClick={() => setSelectedOfferId(offer.id)}
                                                            >
                                                                <OfferCard offer={offer}/>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>

            {selectedOfferId && (
                <OfferDetails
                    userId={userId}
                    offerId={selectedOfferId}
                    onClose={() => setSelectedOfferId(null)}
                />
            )}
        </div>
    );
}
