import { CiUser, CiCircleList } from 'react-icons/ci'
import { IoIosHeartEmpty } from 'react-icons/io'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { MdHistoryToggleOff } from 'react-icons/md'

export const profilePages = {
  en: {
    list: [
      { title: 'Profile', icon: CiUser, link: '/profile' },
      { title: 'Chat History', icon: IoChatboxEllipsesOutline, link: '/profile/chatsession'},
      { title: 'History', icon: MdHistoryToggleOff, link: '/profile/history' },
      { title: 'Liked Words', icon: IoIosHeartEmpty, link: '/profile/expression' },
      { title: 'Your Lists', icon: CiCircleList, link: '/profile/list' },
    ],
    edit: "Edit profile",
    logout: "Log out",
    history: "History",
    chat: "Chat History",
    view_all: "View All",
    liked: "Liked",
    lists: "Lists",
    profile: "Profile Settings",
    view_history: "View History",
    view_chat: "View Chat History",
    liked_expression: "Liked Expressions",
    your_lists: "Your Lists",
  },
  zh: {
    list: [
      { title:'个人资料', icon: CiUser, link: '/profile' },
      { title: '聊天记录', icon: IoChatboxEllipsesOutline, link: '/profile/chatsession'},
      { title: '浏览记录', icon: MdHistoryToggleOff, link: '/profile/history' },
      { title: '喜欢的表达式', icon: IoIosHeartEmpty, link: '/profile/expression' },
      { title: '表达式列表', icon: CiCircleList, link: '/profile/list' },
    ],
    edit: "编辑个人资料",
    logout: "退出登陆",
    history: "浏览历史",
    chat: "聊天历史",
    view_all: "查看所有",
    liked: "喜欢的表达式",
    lists: "表达式列表",
    profile: "个人信息设置",
    view_history: "你的浏览记录",
    view_chat: "你的聊天记录",
    liked_expression: "喜欢的表达式",
    your_lists: "你的表达式列表",
  }
}