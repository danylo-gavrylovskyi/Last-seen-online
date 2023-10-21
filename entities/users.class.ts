import { LastSeenUser } from "../types/lastSeenUser.interface";
import { LastSeenUserResult } from "../types/lastSeenUserResult.interface";

export class Users {
	private data: LastSeenUser[] = [];
	private total: number;

	constructor({ data, total }: LastSeenUserResult) {
		this.data = data;
		this.total = total;
	}

	addData(newData: LastSeenUser[]) {
		this.data = [...this.data, ...newData];
	}

	getData() {
		return this.data;
	}

	getTotal() {
		return this.total;
	}
}
