import Layout from "../components/Layout";
import Auth from "../components/Auth";
import { userStore } from "../store/userStore";
import Chat from "../components/Chat";

export default function Home() {
    const { user } = userStore();

    return <Layout>{!user ? <Auth /> : <Chat user={user} />}</Layout>;
}
