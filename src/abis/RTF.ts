import * as ethers from 'ethers'
import {LogEvent, Func, ContractBase} from './abi.support'
import {ABI_JSON} from './RTF.abi'

export const abi = new ethers.utils.Interface(ABI_JSON);

export const events = {
    Approval: new LogEvent<([owner: string, approved: string, tokenId: ethers.BigNumber] & {owner: string, approved: string, tokenId: ethers.BigNumber})>(
        abi, '0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925'
    ),
    ApprovalForAll: new LogEvent<([owner: string, operator: string, approved: boolean] & {owner: string, operator: string, approved: boolean})>(
        abi, '0x17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c31'
    ),
    Minted: new LogEvent<([minter: string, nftID: ethers.BigNumber, uri: string, price: ethers.BigNumber] & {minter: string, nftID: ethers.BigNumber, uri: string, price: ethers.BigNumber})>(
        abi, '0xf5c82eda717141c5f0cfeb894e7b7819c158a337b62ec13d412aecad30b0ad9e'
    ),
    NftListStatus: new LogEvent<([owner: string, nftID: ethers.BigNumber, isListed: boolean] & {owner: string, nftID: ethers.BigNumber, isListed: boolean})>(
        abi, '0x3fd63d9ca8dc693a1b9911e664951294721009a4f6239c862d6719a160a1edfc'
    ),
    OwnershipTransferred: new LogEvent<([previousOwner: string, newOwner: string] & {previousOwner: string, newOwner: string})>(
        abi, '0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0'
    ),
    PriceUpdate: new LogEvent<([owner: string, oldPrice: ethers.BigNumber, newPrice: ethers.BigNumber, nftID: ethers.BigNumber] & {owner: string, oldPrice: ethers.BigNumber, newPrice: ethers.BigNumber, nftID: ethers.BigNumber})>(
        abi, '0x8647dab5101cbe18afb171756e9753802f9d66725bf2346b079b8b1a275e0116'
    ),
    Purchase: new LogEvent<([previousOwner: string, newOwner: string, nftID: ethers.BigNumber, uri: string] & {previousOwner: string, newOwner: string, nftID: ethers.BigNumber, uri: string})>(
        abi, '0x919be812a285f2dcdadb642b6be908c8924fb8e7c1bb20ceb040ed312b03c813'
    ),
    Requested: new LogEvent<([executor: string, nftID: ethers.BigNumber] & {executor: string, nftID: ethers.BigNumber})>(
        abi, '0x189155e729161d41c9756b8f023ae2bcb16166eb447c05edd79b57f5c29f19e3'
    ),
    Transfer: new LogEvent<([from: string, to: string, tokenId: ethers.BigNumber] & {from: string, to: string, tokenId: ethers.BigNumber})>(
        abi, '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
    ),
}

export const functions = {
    WGLMR: new Func<[], {}, string>(
        abi, '0x91d754c4'
    ),
    approve: new Func<[to: string, tokenId: ethers.BigNumber], {to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x095ea7b3'
    ),
    balanceOf: new Func<[owner: string], {owner: string}, ethers.BigNumber>(
        abi, '0x70a08231'
    ),
    buy: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, []>(
        abi, '0xd96a094a'
    ),
    escrowFromItem: new Func<[_: ethers.BigNumber], {}, string>(
        abi, '0x7b6ed9de'
    ),
    getApproved: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0x081812fc'
    ),
    getAvailable: new Func<[_tokenId: ethers.BigNumber], {_tokenId: ethers.BigNumber}, number>(
        abi, '0x9f093552'
    ),
    getEscrowAddress: new Func<[_tokenId: ethers.BigNumber], {_tokenId: ethers.BigNumber}, string>(
        abi, '0x290fe2df'
    ),
    getNftDetails: new Func<[_tokenId: ethers.BigNumber], {_tokenId: ethers.BigNumber}, [_: string, _: ethers.BigNumber, _: boolean, _: string]>(
        abi, '0xe85cd748'
    ),
    isApprovedForAll: new Func<[owner: string, operator: string], {owner: string, operator: string}, boolean>(
        abi, '0xe985e9c5'
    ),
    isAvailable: new Func<[_: ethers.BigNumber], {}, number>(
        abi, '0x3a178d99'
    ),
    listedMap: new Func<[_: ethers.BigNumber], {}, boolean>(
        abi, '0xbc8ba28f'
    ),
    mint: new Func<[_tokenURI: string, _toAddress: string, _price: ethers.BigNumber], {_tokenURI: string, _toAddress: string, _price: ethers.BigNumber}, ethers.BigNumber>(
        abi, '0x7e8816b9'
    ),
    name: new Func<[], {}, string>(
        abi, '0x06fdde03'
    ),
    owner: new Func<[], {}, string>(
        abi, '0x8da5cb5b'
    ),
    ownerOf: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0x6352211e'
    ),
    platformAddress: new Func<[], {}, string>(
        abi, '0xdbe55e56'
    ),
    platformFee: new Func<[], {}, ethers.BigNumber>(
        abi, '0x26232a2e'
    ),
    price: new Func<[_: ethers.BigNumber], {}, ethers.BigNumber>(
        abi, '0x26a49e37'
    ),
    renounceOwnership: new Func<[], {}, []>(
        abi, '0x715018a6'
    ),
    requestCoupon: new Func<[_id: ethers.BigNumber], {_id: ethers.BigNumber}, boolean>(
        abi, '0x4332b1d4'
    ),
    'safeTransferFrom(address,address,uint256)': new Func<[from: string, to: string, tokenId: ethers.BigNumber], {from: string, to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x42842e0e'
    ),
    'safeTransferFrom(address,address,uint256,bytes)': new Func<[from: string, to: string, tokenId: ethers.BigNumber, data: string], {from: string, to: string, tokenId: ethers.BigNumber, data: string}, []>(
        abi, '0xb88d4fde'
    ),
    setApprovalForAll: new Func<[operator: string, approved: boolean], {operator: string, approved: boolean}, []>(
        abi, '0xa22cb465'
    ),
    setPlatformAddress: new Func<[_platformAddress: string], {_platformAddress: string}, []>(
        abi, '0xcc03c342'
    ),
    setPlatformFee: new Func<[_platformFee: ethers.BigNumber], {_platformFee: ethers.BigNumber}, []>(
        abi, '0x12e8e2c3'
    ),
    supportsInterface: new Func<[interfaceId: string], {interfaceId: string}, boolean>(
        abi, '0x01ffc9a7'
    ),
    symbol: new Func<[], {}, string>(
        abi, '0x95d89b41'
    ),
    tokenURI: new Func<[tokenId: ethers.BigNumber], {tokenId: ethers.BigNumber}, string>(
        abi, '0xc87b56dd'
    ),
    transferFrom: new Func<[from: string, to: string, tokenId: ethers.BigNumber], {from: string, to: string, tokenId: ethers.BigNumber}, []>(
        abi, '0x23b872dd'
    ),
    transferOwnership: new Func<[newOwner: string], {newOwner: string}, []>(
        abi, '0xf2fde38b'
    ),
    updateListingStatus: new Func<[_tokenId: ethers.BigNumber, shouldBeListed: boolean], {_tokenId: ethers.BigNumber, shouldBeListed: boolean}, boolean>(
        abi, '0x98214bcb'
    ),
    updatePrice: new Func<[_tokenId: ethers.BigNumber, _price: ethers.BigNumber], {_tokenId: ethers.BigNumber, _price: ethers.BigNumber}, boolean>(
        abi, '0x82367b2d'
    ),
}

export class Contract extends ContractBase {

    WGLMR(): Promise<string> {
        return this.eth_call(functions.WGLMR, [])
    }

    balanceOf(owner: string): Promise<ethers.BigNumber> {
        return this.eth_call(functions.balanceOf, [owner])
    }

    escrowFromItem(arg0: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.escrowFromItem, [arg0])
    }

    getApproved(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.getApproved, [tokenId])
    }

    getAvailable(_tokenId: ethers.BigNumber): Promise<number> {
        return this.eth_call(functions.getAvailable, [_tokenId])
    }

    getEscrowAddress(_tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.getEscrowAddress, [_tokenId])
    }

    getNftDetails(_tokenId: ethers.BigNumber): Promise<[_: string, _: ethers.BigNumber, _: boolean, _: string]> {
        return this.eth_call(functions.getNftDetails, [_tokenId])
    }

    isApprovedForAll(owner: string, operator: string): Promise<boolean> {
        return this.eth_call(functions.isApprovedForAll, [owner, operator])
    }

    isAvailable(arg0: ethers.BigNumber): Promise<number> {
        return this.eth_call(functions.isAvailable, [arg0])
    }

    listedMap(arg0: ethers.BigNumber): Promise<boolean> {
        return this.eth_call(functions.listedMap, [arg0])
    }

    name(): Promise<string> {
        return this.eth_call(functions.name, [])
    }

    owner(): Promise<string> {
        return this.eth_call(functions.owner, [])
    }

    ownerOf(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.ownerOf, [tokenId])
    }

    platformAddress(): Promise<string> {
        return this.eth_call(functions.platformAddress, [])
    }

    platformFee(): Promise<ethers.BigNumber> {
        return this.eth_call(functions.platformFee, [])
    }

    price(arg0: ethers.BigNumber): Promise<ethers.BigNumber> {
        return this.eth_call(functions.price, [arg0])
    }

    supportsInterface(interfaceId: string): Promise<boolean> {
        return this.eth_call(functions.supportsInterface, [interfaceId])
    }

    symbol(): Promise<string> {
        return this.eth_call(functions.symbol, [])
    }

    tokenURI(tokenId: ethers.BigNumber): Promise<string> {
        return this.eth_call(functions.tokenURI, [tokenId])
    }
}
