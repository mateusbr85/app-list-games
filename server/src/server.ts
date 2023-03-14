import express from 'express';
import cors from 'cors';
import {ConvertTimeFunctions} from './utils/ConvertTimeFunctions'
import { PrismaClient } from '@prisma/client'

const app = express();
app.use(cors());

app.use(express.json());

const prisma = new PrismaClient();

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count:{
                select: {
                    announcements: true,
                }
            }
        }
    });
    return res.json(games);
});


app.post('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;
    const body: any = req.body;
    // console.log({body});
    // console.log({gameId});

    const announcementAd = await prisma.announcement.create({
        data: {
            game_fk_id: gameId,
            announcement_name: body.announcement_name,
            announcement_yers_paying: body.announcement_yers_paying,
            announcement_discord: body.announcement_discord,
            announcement_week_days: body.announcement_week_days.join(','),
            announcement_hour_start: ConvertTimeFunctions.convertHoursStringToMinutes(body.announcement_hour_start),
            announcement_hour_end: ConvertTimeFunctions.convertHoursStringToMinutes(body.announcement_hour_end),
            announcement_voice_channel: body.announcement_voice_channel
        }
    })

    return res.json(announcementAd);
});

app.get('/games/:id/ads', async (req, res) => {
    const game_fk_id = req.params.id;

    const announcements = await prisma.announcement.findMany({
        select: {
            announcement_id: true,
            announcement_name: true,
            announcement_week_days: true,
            announcement_voice_channel: true,
            announcement_yers_paying: true,
            announcement_hour_start: true,
            announcement_hour_end: true,
        },
        where: {
            game_fk_id,
        },
        orderBy: {
            announcement_created_at: 'desc'
        }
    })

    return res.json(announcements.map(ad => {
        return {
            ...ad,
            announcement_week_days: ad.announcement_week_days.split(','),
            announcement_hour_start: ConvertTimeFunctions.convertMinutesStringToHours(ad.announcement_hour_start),
            announcement_hour_end: ConvertTimeFunctions.convertMinutesStringToHours(ad.announcement_hour_end),
        }
    }))
})

app.get('/announcement/:id/discord', async (req, res) => {
    const id = req.params.id;

    const announcement = await prisma.announcement.findUniqueOrThrow({
        select: {
            announcement_discord: true,
        },
        where: {
            announcement_id: id,
        }
    })

    return res.json(announcement)
})


app.listen(3000);