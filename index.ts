import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ethers } from "ethers";
import { Metadrobe } from "./typechain-types";

import MetaDrobeABI from "./Metadrobe.json";
import { UrnStuff } from "./generalStuff";

const collectionName = "metadrobewomen";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get(
  "/registry/" + collectionName + "/address/:address/assets/:id",
  async (req: Request, res: Response) => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-rpc.com/"
    );

    const { registryId, address, id } = req.params;
    res.send(
      `Registry ID: ${registryId}, Address: ${address}, Asset ID: ${id}`
    );
  }
);

app.get(
  "/registry/" + collectionName + "/address/:address/assets",
  async (req: Request, res: Response) => {
    const { address, id } = req.params;
    console.log("lol");
    const provider = new ethers.providers.JsonRpcProvider(
      "https://polygon-rpc.com/"
    );
    console.log("TF");
    const contract = new ethers.Contract(
      "0x4c1573189e308d0a4d8bec421082fa8e39eee58e",
      MetaDrobeABI.abi,
      provider
    ) as Metadrobe;

    const addressAssets = await contract.balanceOf(address);
    const assetNumber = addressAssets.toNumber();

    const assets: UrnStuff[] = [];

    for (let i = 0; i < assetNumber; i++) {
      const asset = await contract.tokenOfOwnerByIndex(address, i);
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
  }
);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
