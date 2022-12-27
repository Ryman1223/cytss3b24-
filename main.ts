namespace SpriteKind {
    export const playershot = SpriteKind.create()
    export const girl = SpriteKind.create()
    export const Enemyshot = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shootBulletFromSprite(mySprite, 1000, 720)
})
info.onScore(30, function () {
    game.splash("你成功打敗騙子了")
    game.splash("謝謝你的游玩")
    game.over(true)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.playershot, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemyshot, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-0.1)
})
info.onLifeZero(function () {
    mySprite.destroy()
    boss.destroy()
    game.splash("加油下一次再來")
    game.over(false)
})
function shootBulletFromSprite (sourceSprite: Sprite, speed: number, angle: number) {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, sourceSprite, speed * Math.sin(angle / 57.3), speed * -1 * Math.cos(angle / 57.3))
    if (sourceSprite.kind() == SpriteKind.Player) {
        projectile.setKind(SpriteKind.playershot)
        projectile.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 4 4 . . . . . . . 
            . . . . . . 4 5 5 4 . . . . . . 
            . . . . . . 2 5 5 2 . . . . . . 
            . . . . . . . 2 2 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    } else {
        projectile.setKind(SpriteKind.Enemyshot)
        projectile.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . 9 9 . . . . . . . 
            . . . . . . 9 1 1 9 . . . . . . 
            . . . . . . 9 1 1 9 . . . . . . 
            . . . . . . . 9 9 . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.girl, function (sprite, otherSprite) {
    game.splash("你好，挑戰開始")
    if (game.ask("有一個人叫你買股票信不信？", "A：不相信 B：相信")) {
        game.splash("Next question")
        if (game.ask("我有一個股票課程只要$99", "A：不買 B：買下去")) {
            game.splash("啊！你居然拒絕我")
            game.splash("最後騙子沒錢消失了")
            game.over(true)
        } else {
            game.splash("可惜了", "你的錢都給我了byebye")
            game.over(false)
        }
    } else {
        tiles.setCurrentTilemap(tilemap`層級4`)
        mySprite2.destroy()
        mySprite3.destroy()
        game.splash("隱藏任務", "打敗騙子的幫手")
        game.splash("按A發射子彈")
        boss = sprites.create(img`
            ........................
            ........................
            ........................
            ........................
            ..........ffff..........
            ........ff1111ff........
            .......fb111111bf.......
            .......f11111111f.......
            ......fd11111111df......
            ......fd11111111df......
            ......fddd1111dddf......
            ......fbdbfddfbdbf......
            ......fcdcf11fcdcf......
            .......fb111111bf.......
            ......fffcdb1bdffff.....
            ....fc111cbfbfc111cf....
            ....f1b1b1ffff1b1b1f....
            ....fbfbffffffbfbfbf....
            .........ffffff.........
            ...........fff..........
            ........................
            ........................
            ........................
            ........................
            `, SpriteKind.Enemy)
        boss.setPosition(73, 53)
        mySprite.setPosition(156, 115)
        for (let index = 0; index < 100000; index++) {
            pause(200)
            shootBulletFromSprite(boss, randint(50, 500), randint(0, 16000000))
        }
    }
})
let projectile: Sprite = null
let boss: Sprite = null
let mySprite3: Sprite = null
let mySprite2: Sprite = null
let mySprite: Sprite = null
tiles.setCurrentTilemap(tilemap`層級0`)
mySprite = sprites.create(assets.image`我的影像`, SpriteKind.Player)
mySprite.setPosition(20, 92)
mySprite2 = sprites.create(img`
    . . . . . . 5 . 5 . . . . . . . 
    . . . . . f 5 5 5 f f . . . . . 
    . . . . f 1 5 2 5 1 6 f . . . . 
    . . . f 1 6 6 6 6 6 1 6 f . . . 
    . . . f 6 6 f f f f 6 1 f . . . 
    . . . f 6 f f d d f f 6 f . . . 
    . . f 6 f d f d d f d f 6 f . . 
    . . f 6 f d 3 d d 3 d f 6 f . . 
    . . f 6 6 f d d d d f 6 6 f . . 
    . f 6 6 f 3 f f f f 3 f 6 6 f . 
    . . f f d 3 5 3 3 5 3 d f f . . 
    . . f d d f 3 5 5 3 f d d f . . 
    . . . f f 3 3 3 3 3 3 f f . . . 
    . . . f 3 3 5 3 3 5 3 3 f . . . 
    . . . f f f f f f f f f f . . . 
    . . . . . f f . . f f . . . . . 
    `, SpriteKind.girl)
mySprite2.setPosition(119, 70)
mySprite3 = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . 2 2 2 2 2 2 2 2 . . . . 
    . . . 2 4 2 2 2 2 2 2 c 2 . . . 
    . . 2 c 4 2 2 2 2 2 2 c c 2 . . 
    . 2 c c 4 4 4 4 4 4 2 c c 4 2 d 
    . 2 c 2 e e e e e e e b c 4 2 2 
    . 2 2 e b b e b b b e e b 4 2 2 
    . 2 e b b b e b b b b e 2 2 2 2 
    . e e 2 2 2 e 2 2 2 2 2 e 2 2 2 
    . e e e e e e f e e e f e 2 d d 
    . e e e e e e f e e f e e e 2 d 
    . e e e e e e f f f e e e e e e 
    . e f f f f e e e e f f f e e e 
    . . f f f f f e e f f f f f e . 
    . . . f f f . . . . f f f f . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
mySprite3.setPosition(10, 88)
info.setLife(5)
info.setScore(0)
game.splash("你是男孩", "任務一：和旁邊的女孩說話")
game.splash("你的目標是不要失去$100")
scene.cameraFollowSprite(mySprite)
controller.moveSprite(mySprite)
