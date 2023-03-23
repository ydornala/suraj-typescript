"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helperStuff_1 = require("./helperStuff");
const singularHelper_1 = require("./singularHelper");
const womenCollection = "metadrobewomen";
const menCollection = "metadrobemen";
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/registry/:collectionMeme/address/:address/assets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, id, collectionMeme } = req.params;
    try {
        if (womenCollection === collectionMeme) {
            const toSend = yield (0, helperStuff_1.metadrobeWomenHelper)(address, womenCollection);
            res.send(JSON.stringify(toSend));
        }
        else if (menCollection === collectionMeme) {
            const toSend = yield (0, helperStuff_1.metadrobeMenHelper)(address, menCollection);
            res.send(JSON.stringify(toSend));
        }
        else {
            res.send(JSON.stringify({
                address: address,
                assets: [],
                total: 0,
                page: 1,
                next: "",
            }));
        }
    }
    catch (err) {
        console.error(err);
        res.send(JSON.stringify({
            address: address,
            assets: [],
            total: 0,
            page: 1,
            next: "",
        }));
    }
}));
app.get("/registry/:collectionName/address/:address/assets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, id, collectionName } = req.params;
    try {
        if (collectionName === womenCollection) {
            const toSend = yield (0, singularHelper_1.singularHelpWomen)(id, womenCollection);
            res.send(JSON.stringify(toSend));
        }
        else if (collectionName === menCollection) {
            const toSend = yield (0, singularHelper_1.singularHelpMen)(id, menCollection);
            res.send(JSON.stringify(toSend));
        }
        else {
            res.send(JSON.stringify({
                address: "0x4c1573189e308d0a4d8bec421082fa8e39eee58e",
                amount: 0,
                urn: {
                    decentraland: "",
                },
            }));
        }
    }
    catch (err) {
        console.error(err);
        res.send(JSON.stringify({
            address: "0x4c1573189e308d0a4d8bec421082fa8e39eee58e",
            amount: 0,
            urn: {
                decentraland: "",
            },
        }));
    }
}));
app.listen(3000, () => {
    console.log(`[server]: Server is running at http://localhost:${3000}`);
});
