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

export declare class Trello {
    constructor(key: string, token: string);

    /**
     * Send request
     *
     * @param {string} requestMethod
     * @param {string} path
     * @param {Object} options
     * @returns {Promise<any>}
     */
    public request(requestMethod: string, path: string, options?: Object): Promise<any>;

    /**
     * List a members app tokens
     * @api /members/{id}/tokens
     * @see https://developers.trello.com/v1.0/reference#membersidtokens
     *
     * @param {string} memberId
     * @returns {Promise<Array<BoardSchema>>}
     */
    public getTokens(memberId: string): Promise<Array<TokensSchema>>;

    /**
     * Lists the boards a member has access to
     * @api /members/{id}/boards
     * @see https://developers.trello.com/v1.0/reference#membersidboards
     *
     * @param {string} memberId
     * @param {Object} options
     * @returns {Promise<Array<BoardSchema>>}
     */
    public getBoards(memberId: string, options?: Object): Promise<Array<BoardSchema>>;

    /**
     * Lists the lists a board
     * @api /boards/{id}/lists
     * @see https://developers.trello.com/v1.0/reference#boardsboardidlists
     *
     * @param {string} boardId
     * @param {Object} options
     * @returns {Promise<Array<ListSchema>>}
     */
    public getLists(boardId: string, options?: Object): Promise<Array<ListSchema>>;
    /**
     * Lists the cards a board
     * @api /boards/{id}/cards
     * @see https://developers.trello.com/v1.0/reference#boardsboardidtest
     *
     * @param {string} boardId
     * @param {Object} options
     * @returns {Promise<Array<CardSchema>>}
     */
    public getCards(boardId: string, options?: Object): Promise<Array<CardSchema>>;

    /**
     * List the cards in a list
     * @api /lists/{id}/cards
     * @see https://developers.trello.com/v1.0/reference#listsidcards
     *
     * @param {string} listId
     * @param {Object} options
     * @returns {Promise<Array<ListSchema>>}
     */
    public getCardsOnList(listId: string, options?: Object): Promise<Array<ListSchema>>;

    /**
     * Lists the checklists a board
     * @api /boards/{id}/checklists
     * @see https://developers.trello.com/v1.0/reference#boardsboardidactions-3
     *
     * @param {string} boardId
     * @param {Object} options
     * @returns {Promise<Array<ChecklistSchema>>}
     */
    public getChecklists(boardId: string, options?: Object): Promise<Array<ChecklistSchema>>;

    /**
     * List the checklists in a card
     * @api /cards/{id}/checklists
     * @see https://developers.trello.com/v1.0/reference#cardsidchecklists
     *
     * @param {string} cardId
     * @param {Object} options
     * @returns {Promise<Array<ListSchema>>}
     */
    public getChecklistsOnCard(cardId: string, options?: Object): Promise<Array<ListSchema>>;

    /**
     * Lists the comments in a board
     * @api /boards/{id}/actions?filter=commentCard
     * @see https://developers.trello.com/v1.0/reference#boardsboardidactions
     *
     * @param {string} boardId
     * @returns {Promise<Array<CommentCardSchema>>}
     */
    public getComments(boardId: string): Promise<Array<CommentCardSchema>>;

    /**
     * Lists the comments in a card
     * @api /cards/{id}/actions?filter=commentCard
     * @see https://developers.trello.com/v1.0/reference#cardsidactions
     *
     * @param {string} cardId
     * @returns {Promise<Array<CommentCardSchema>>}
     */
    public getCommentsOnCard(cardId: string): Promise<Array<CommentCardSchema>>;
}