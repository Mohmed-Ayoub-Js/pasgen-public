import { apiUrl } from "@/lib/public";
import axios from "axios";

export default function registeringHistory(action : string){
    axios.post(`${apiUrl}/saveactivity`, {action :action}).then((res) => {
        console.log(res);
      }).catch((err) => {
        console.log(err);
      })
}