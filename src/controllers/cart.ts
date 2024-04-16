import { Request, Response } from "express";
import { ChangeQuantitySchema, CreateCartSchema } from "../schema/cart";
import { NotFoundException } from "../exceptions/not-found";
import { ErrorCode } from "../exceptions/root";
import { Product } from "@prisma/client";
import { prismaClient } from "..";

export const addItemToCart = async(req:any, res:Response) => {
    // check for the existence of the same product in user's cart and alter the quantity as require
    const validatedData = CreateCartSchema.parse(req.body)
    let product: Product
    try {
        product = await prismaClient.product.findFirstOrThrow({
            where: {
                id: validatedData.productId
            }
        })
    } catch (err) {
        throw new NotFoundException('Product not found!',ErrorCode.PRODUCT_NOT_FOUND)
    }
    const cart = await prismaClient.cartItem.create({
        data: {
            userId: req.user.id,
            productId: product.id,
            quantity: validatedData.quantity
        }
    })
    res.json(cart)
}

export const deleteItemFromCart = async(req:Request, res:Response) => {
    // check if user is delete its own cart item
    await prismaClient.cartItem.delete({
        where: {
            id: +req.params.id
        }
    })
    res.json({success: true})
}

export const changeQuantity = async(req:Request, res:Response) => {
    // check if user is updateing its own cart item
    const validatedData = ChangeQuantitySchema.parse(req.body)
    const updatedCart = await prismaClient.cartItem.update({
        where: {
            id: +req.params.id
        },
        data: {
            quantity: validatedData.quantity
        }
    })
    res.json(updatedCart)
}

export const getCart = async(req:any, res:Response) => {
    const cart = await prismaClient.cartItem.findMany({
        where: {
            userId: req.user.id
        },
        include: {
            product: true
        }
    })
    res.json(cart)
}