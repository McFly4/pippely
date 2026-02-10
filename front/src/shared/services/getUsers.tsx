import "axios"
import axios from "axios";

const url = process.env.NEXT_PUBLIC_API_URL

export async function getUsers() {
	const { data } = await axios.get(`${url}/users`)
	return data
}



