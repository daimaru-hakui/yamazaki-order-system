import paths from "@/paths";
import TitleReturn from "../common/title-return";

export default function CustomerShow(){
    return (
        <div>
            <TitleReturn title="工場詳細" path={paths.customerAll()}/>
        </div>
    )
}