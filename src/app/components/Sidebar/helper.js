import {
    Add,
    Apps,
    BookmarkBorder,
    Drafts,
    ExpandLess, ExpandMore,
    FileCopy,
    Inbox,
    InsertComment,
    PeopleAlt
} from "@material-ui/icons"

export const sidebarOptions = [
    {
        icon: InsertComment,
        title: "Threads"
    },
    {
        icon: Inbox,
        title: "Mentions & reactions"
    },
    {
        icon: Drafts,
        title: "Saved items"
    },
    {
        icon:BookmarkBorder,
        title: "Channel browser"
    },
    {
        icon: PeopleAlt,
        title: "People & user groups"
    },
    {
        icon: Apps,
        title: "Apps"
    },
    {
        icon: FileCopy,
        title: "File browser"
    },
    {
        icon: ExpandLess,
        title: "Show less"
    }
]

export const sidebarSecondaryOptions = [
    {
        icon: ExpandMore,
        title: "Channels",
        haveDivider: true
    },
    {
        icon: Add,
        title: "Add channel",
        haveDivider: true,
        addAction: true,
    },

]