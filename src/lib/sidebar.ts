import type { Sidebar } from "$lib/components/app-sidebar.svelte"

export const sidebar = {
  childs: [
    {
      title: 'ภาพรวมโดยทั่วไป',
      phref: '/',
      links: [
        {
          title: 'คณะที่ได้รับความสนใจมากที่สุด',
          href: '/#คณะที่ได้รับความสนใจมากที่สุด'
        },
        {
          title: 'แหล่งข่าวสารเกี่ยวกับงาน',
          href: '/#แหล่งข่าวสารเกี่ยวกับงาน'
        },
        {
          title: 'สถานภาพผู้เข้าร่วมงาน',
          href: '/#สถานภาพผู้เข้าร่วมงาน'
        },
        {
          title: 'อายุผู้เข้าร่วมงาน',
          href: '/#อายุผู้เข้าร่วมงาน'
        },
      ]
    }
  ]
} satisfies Sidebar;