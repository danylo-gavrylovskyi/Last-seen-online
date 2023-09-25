import { LastSeenUser } from "../types/lastSeenUser.interface";
import { LastSeenUserResult } from "../types/lastSeenUserResult.interface";

export class Users {
	private data: LastSeenUser[];
	private total: number;

	constructor({ data, total }: LastSeenUserResult) {
		this.data = data;
		this.total = total;
	}

	getData() {
		return this.data;
	}

	getTotal() {
		return this.total;
	}
}
