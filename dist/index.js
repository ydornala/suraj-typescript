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
const dotenv_1 = __importDefault(require("dotenv"));
const ethers_1 = require("ethers");
const Metadrobe_json_1 = __importDefault(require("./Metadrobe.json"));
const collectionName = "metadrobewomen";
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/registry/" + collectionName + "/address/:address/assets/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
    const { registryId, address, id } = req.params;
    res.send(`Registry ID: ${registryId}, Address: ${address}, Asset ID: ${id}`);
}));
app.get("/registry/" + collectionName + "/address/:address/assets", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { address, id } = req.params;
    console.log("lol");
    const provider = new ethers_1.ethers.providers.JsonRpcProvider("https://polygon-rpc.com/");
    console.log("TF");
    const contract = new ethers_1.ethers.Contract("0x4c1573189e308d0a4d8bec421082fa8e39eee58e", Metadrobe_json_1.default.abi, provider);
    const addressAssets = yield contract.balanceOf(address);
    const assetNumber = addressAssets.toNumber();
    const assets = [];
    for (let i = 0; i < assetNumber; i++) {
        const asset = yield contract.tokenOfOwnerByIndex(address, i);
        assets.push({
            id: `0x4c1573189e308d0a4d8bec421082fa8e39eee58e${asset.toString()}`,
            amount: 1,
            urn: {
                decentraland: `urn:decentraland:matic:collections-thirdparty:${collectionName}:0x4c1573189e308d0a4d8bec421082fa8e39eee58e:${asset.toString()}`,
            },
        });
    }
    const toJson = {
        address: address,
        assets: assets,
        total: assetNumber,
        page: 1,
    };
    res.send(JSON.stringify(toJson));
}));
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
