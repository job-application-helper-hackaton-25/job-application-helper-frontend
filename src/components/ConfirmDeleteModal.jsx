import { motion, AnimatePresence } from "framer-motion";

export default function ConfirmDeleteModal({
                                               open,
                                               title,
                                               description,
                                               onCancel,
                                               onConfirm,
                                           }) {
    if (!open) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] flex items-center justify-center"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
                >
                    <h3 className="text-lg font-bold mb-2">{title}</h3>
                    <p className="text-gray-600 mb-6">{description}</p>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={onCancel}
                            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-200 transition"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
