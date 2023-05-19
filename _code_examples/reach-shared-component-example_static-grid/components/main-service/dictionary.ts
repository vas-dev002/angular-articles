class KeyValuePair<TKey, TValue> {
	constructor(public key: TKey, public value: TValue) { }
}

class KeyExistsDictionaryError extends Error { }

// eslint-disable-next-line max-classes-per-file
export class Dictionary<TKey, TValue> {
	private readonly _dictionary = new Map<TKey, TValue>();

	constructor(keyValuePairs?: KeyValuePair<TKey, TValue>[]) {
		if (keyValuePairs) {
			keyValuePairs.forEach(keyValuePair => this.addPair(keyValuePair));
		}
	}

	has(key: TKey): boolean {
		return this._dictionary.has(key);
	}

	add(key: TKey, value: TValue): Dictionary<TKey, TValue> {
		if (this.has(key)) { throw new KeyExistsDictionaryError(); }
		this._dictionary.set(key, value);
		return this;
	}

	addPair(keyValuePair: KeyValuePair<TKey, TValue>): Dictionary<TKey, TValue> {
		return this.add(keyValuePair.key, keyValuePair.value);
	}

	addMultipleKeys(keys: TKey[], value: TValue): Dictionary<TKey, TValue> {
		keys.forEach(key => this.add(key, value));
		return this;
	}

	remove(key: TKey): boolean {
		return this._dictionary.delete(key);
	}

	get(key: TKey): TValue {
		return this._dictionary.get(key);
	}
}
