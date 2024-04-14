import { Suspense } from "react";
import Loader from "./components/Loader";
import App from "./App";

export default function MainApp() {
    return (
        <Suspense fallback={<Loader />}>
            <App />
        </Suspense>
    );
}