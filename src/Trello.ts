import {makeRequest, methods} from './lib/Utility';

export interface QueryParams {
    key: string;
    token: string;
}

export interface TokensSchema {
    id: string;
    identifier: string;
    idMember: string;
    dateCreated: string;
    dateExpires: string;
    permissions: Array<any>;
}

export interface BoardSchema {
    id: string;
    name: string;
    url: string;
    shortUrl: string,
    desc: string;
    descData: string;
    closed: boolean;
    invited: boolean;
    starred: boolean;
    subscribed: false;
    idOrganization: string;
    limits: string;
    pinned: string;
    invitations: string;
    shortLink: string;
    powerUps: Array<any>;
    idTags: Array<any>;
    datePluginDisable: string;
    labelNames: {[key: string]: string}
    dateLastActivity: string;
    dateLastView: string;
}

export interface ListSchema {
    id: string;
    name: string;
    idBoard: string;
    pos: number;
    closed: boolean;
    subscribed: boolean;
}

export interface CardSchema {
    id: string;
    name: string;
    url: string;
    shortUrl: string;
    shortLink: string;
    desc: string;
    descData: string;
    checkItemStates: string;
    closed: boolean;
    subscribed: boolean;
    dateLastActivity: string;
    idBoard: string;
    idList: string;
    idShort: number;
    idAttachmentCover: string;
    idLabels: Array<string>;
    idChecklists: Array<string>;
    idMembers: Array<string>;
    idMembersVoted: Array<any>;
    labels: Array<LabelSchema>;
    manualCoverAttachment: boolean;
    pos: number;
    dueComplete: boolean;
    due: string;
}

export interface LabelSchema {
    id: string;
    name: string;
    idBoard: string;
    color: string;
    uses: number;
}

export interface ChecklistSchema {
    id: string;
    name: string;
    idBoard: string;
    idCard: string;
    pos: number;
    checkItems: Array<CheckItemSchema>;
}

export interface CheckItemSchema {
    id: string;
    name: string;
    state: string;
    idChecklist: string;
    nameData: string;
    pos: number;
}

export interface CommentCardSchema {
    id: string;
    idMemberCreator: string;
    data: {
        text: string;
        dateLastEdited: string;
    };
    type: string;
    date: string;
}

export class Trello {
    private uri = 'https://api.trello.com';
    private key = '';
    private token = '';

    constructor(key: string, token: string) {
        this.key = key;
        this.token = token;
    }

    /**
     * Create base query object
     * @returns {QueryParams}
     */
    private createQuery(): QueryParams {
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
    public async request(requestMethod: string, path: string, options?: Object): Promise<any> {
        options = options || {};

        if (typeof requestMethod !== 'string') {
            throw new TypeError('requestMethod should be a string');
        }

        if (typeof options !== 'object') {
            throw new TypeError('options should be an object');
        }

        let method = requestMethod.toLowerCase();
        if (!methods[method]) {
            throw new Error('Unsupported requestMethod. Pass one of these methods: POST, GET, PUT, DELETE.');
        }

        return makeRequest(methods[method], this.uri + path, {query: Object.assign({}, options, this.createQuery())});
    }

    /**
     * List a members app tokens
     * @api /members/{id}/tokens
     * @see https://developers.trello.com/v1.0/reference#membersidtokens
     *
     * @param {string} memberId
     * @returns {Promise<Array<BoardSchema>>}
     */
    public async getTokens(memberId: string): Promise<Array<TokensSchema>> {
        return makeRequest(methods.get, this.uri + '/1/members/' + memberId + '/tokens', {query: this.createQuery()});
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
    public async getBoards(memberId: string, options?: Object): Promise<Array<BoardSchema>> {
        return makeRequest(methods.get, this.uri + '/1/members/' + memberId + '/boards', {query: Object.assign({}, options, this.createQuery())});
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
    public async getLists(boardId: string, options?: Object): Promise<Array<ListSchema>> {
        return makeRequest(methods.get, this.uri + '/1/boards/' + boardId + '/lists', {query: Object.assign({}, options, this.createQuery())});
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
    public async getCards(boardId: string, options?: Object): Promise<Array<CardSchema>> {
        return makeRequest(methods.get, this.uri + '/1/boards/' + boardId + '/cards', {query: Object.assign({}, options, this.createQuery())});
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
    public async getCardsOnList(listId: string, options?: Object): Promise<Array<ListSchema>> {
        return makeRequest(methods.get, this.uri + '/1/lists/' + listId + '/cards', {query: Object.assign({}, options, this.createQuery())});
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
    public async getChecklists(boardId: string, options?: Object): Promise<Array<ChecklistSchema>> {
        return makeRequest(methods.get, this.uri + '/1/boards/' + boardId + '/checklists', {query: Object.assign({}, options, this.createQuery())});
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
    public async getChecklistsOnCard(cardId: string, options?: Object): Promise<Array<ListSchema>> {
        return makeRequest(methods.get, this.uri + '/1/cards/' + cardId + '/checklists', {query: Object.assign({}, options, this.createQuery())});
    }

    /**
     * Lists the comments in a board
     * @api /boards/{id}/actions?filter=commentCard
     * @see https://developers.trello.com/v1.0/reference#boardsboardidactions
     *
     * @param {string} boardId
     * @returns {Promise<Array<CommentCardSchema>>}
     */
    public async getComments(boardId: string): Promise<Array<CommentCardSchema>> {
        let options = {
            filter: 'commentCard'
        };
        return makeRequest(methods.get, this.uri + '/1/boards/' + boardId + '/actions', {query: Object.assign({}, options, this.createQuery())});
    }

    /**
     * Lists the comments in a card
     * @api /cards/{id}/actions?filter=commentCard
     * @see https://developers.trello.com/v1.0/reference#cardsidactions
     *
     * @param {string} cardId
     * @returns {Promise<Array<CommentCardSchema>>}
     */
    public async getCommentsOnCard(cardId: string): Promise<Array<CommentCardSchema>> {
        let options = {
            filter: 'commentCard'
        };
        return makeRequest(methods.get, this.uri + '/1/cards/' + cardId + '/actions', {query: Object.assign({}, options, this.createQuery())});
    }
}