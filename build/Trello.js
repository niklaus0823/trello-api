"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utility_1 = require("./lib/Utility");
class Trello {
    constructor(key, token) {
        this.uri = 'https://api.trello.com';
        this.key = '';
        this.token = '';
        this.key = key;
        this.token = token;
    }
    /**
     * Create base query object
     * @returns {QueryParams}
     */
    createQuery() {
        return {
            key: this.key,
            token: this.token
        };
    }
    /**
     * Send request
     *
     * @param {string} requestMethod
     * @param {string} path
     * @param {Object} options
     * @returns {Promise<any>}
     */
    request(requestMethod, path, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = options || {};
            if (typeof requestMethod !== 'string') {
                throw new TypeError('requestMethod should be a string');
            }
            if (typeof options !== 'object') {
                throw new TypeError('options should be an object');
            }
            let method = requestMethod.toLowerCase();
            if (!Utility_1.methods[method]) {
                throw new Error('Unsupported requestMethod. Pass one of these methods: POST, GET, PUT, DELETE.');
            }
            return Utility_1.makeRequest(Utility_1.methods[method], this.uri + path, { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * List a members app tokens
     * @api /members/{id}/tokens
     * @see https://developers.trello.com/v1.0/reference#membersidtokens
     *
     * @param {string} memberId
     * @returns {Promise<Array<BoardSchema>>}
     */
    getTokens(memberId) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/members/' + memberId + '/tokens', { query: this.createQuery() });
        });
    }
    /**
     * Lists the boards a member has access to
     * @api /members/{id}/boards
     * @see https://developers.trello.com/v1.0/reference#membersidboards
     *
     * @param {string} memberId
     * @param {Object} options
     * @returns {Promise<Array<BoardSchema>>}
     */
    getBoards(memberId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/members/' + memberId + '/boards', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * Lists the lists a board
     * @api /boards/{id}/lists
     * @see https://developers.trello.com/v1.0/reference#boardsboardidlists
     *
     * @param {string} boardId
     * @param {Object} options
     * @returns {Promise<Array<ListSchema>>}
     */
    getLists(boardId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/boards/' + boardId + '/lists', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * Lists the cards a board
     * @api /boards/{id}/cards
     * @see https://developers.trello.com/v1.0/reference#boardsboardidtest
     *
     * @param {string} boardId
     * @param {Object} options
     * @returns {Promise<Array<CardSchema>>}
     */
    getCards(boardId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/boards/' + boardId + '/cards', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * List the cards in a list
     * @api /lists/{id}/cards
     * @see https://developers.trello.com/v1.0/reference#listsidcards
     *
     * @param {string} listId
     * @param {Object} options
     * @returns {Promise<Array<ListSchema>>}
     */
    getCardsOnList(listId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/lists/' + listId + '/cards', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * Lists the checklists a board
     * @api /boards/{id}/checklists
     * @see https://developers.trello.com/v1.0/reference#boardsboardidactions-3
     *
     * @param {string} boardId
     * @param {Object} options
     * @returns {Promise<Array<ChecklistSchema>>}
     */
    getChecklists(boardId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/boards/' + boardId + '/checklists', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * List the checklists in a card
     * @api /cards/{id}/checklists
     * @see https://developers.trello.com/v1.0/reference#cardsidchecklists
     *
     * @param {string} cardId
     * @param {Object} options
     * @returns {Promise<Array<ListSchema>>}
     */
    getChecklistsOnCard(cardId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/cards/' + cardId + '/checklists', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * Lists the comments in a board
     * @api /boards/{id}/actions?filter=commentCard
     * @see https://developers.trello.com/v1.0/reference#boardsboardidactions
     *
     * @param {string} boardId
     * @returns {Promise<Array<CommentCardSchema>>}
     */
    getComments(boardId) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                filter: 'commentCard'
            };
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/boards/' + boardId + '/actions', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
    /**
     * Lists the comments in a card
     * @api /cards/{id}/actions?filter=commentCard
     * @see https://developers.trello.com/v1.0/reference#cardsidactions
     *
     * @param {string} cardId
     * @returns {Promise<Array<CommentCardSchema>>}
     */
    getCommentsOnCard(cardId) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = {
                filter: 'commentCard'
            };
            return Utility_1.makeRequest(Utility_1.methods.get, this.uri + '/1/cards/' + cardId + '/actions', { query: Object.assign({}, options, this.createQuery()) });
        });
    }
}
exports.Trello = Trello;
