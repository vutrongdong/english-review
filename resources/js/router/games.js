import GameEmbed from '@/components/web/games/GameEmbed';
import List from '@/components/web/games/List';

export const games = [
    {
        path: '/games/',
        exact: true,
        icon: 'fas fa-gamepad',
        name: 'games',
        type: 'navbar',
        component: List
    },
    {
        path: '/games/:type/',
        exact: true,
        component: GameEmbed
    },
    {
        path: '/games/:type/:subtype/',
        component: GameEmbed
    }
];