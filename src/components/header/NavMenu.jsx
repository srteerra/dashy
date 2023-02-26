import { ClockIcon, CurrencyDollarIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import { truncate } from '../../utils/string';
import { classNames } from '../../utils/classNames';
require('@solana/wallet-adapter-react-ui/styles.css');
import { Fade } from "react-awesome-reveal";

const NavMenu = ({ connected, publicKey, setSettingsModalOpen, settingsModalOpen }) => {

    const handleSettings = () => {
        setSettingsModalOpen(!settingsModalOpen)
    }

    const menus = [
        {
            icon: ClockIcon,
            item: 'Activity',
            current: true,
        },
        {
            icon: CurrencyDollarIcon,
            item: 'My Friends',
            current: false,
        },
        {
            icon: Cog6ToothIcon,
            item: 'Settings',
            current: false,
            action: handleSettings
        },
    ]

    return (
        <nav className="flex flex-1 items-center justify-center">
            <ul className="flex flex-col space-y-10">
                {menus.map(({ icon, item, current, action }, i) => (
                    <Fade key={i} direction="left" delay={`${i}0`}>
                        <NavMenuItem key={i} Icon={icon} item={item} current={current} action={action} />
                    </Fade>
                ))}
            </ul>
        </nav >
    );
}
    

const NavMenuItem = ({ Icon, item, current, action }) => {
    return (
        <li onClick={action} className={classNames('flex cursor-pointer space-x-3 transition-all hover:text-gray-100', current ? 'text-white' : 'text-[#7e7293]', 'font-semibold')}>
            <Icon className="h-6 w-6 " />
            <span>{item}</span>
        </li>
    )
}

export default NavMenu;