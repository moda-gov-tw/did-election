import styles from "./header.module.scss"
import { BurgerIcon } from "./img/burgerIcon"
import { useState } from "react"

interface NavItem {
  text: string
  className?: string
  disabled?: boolean
  onClick: () => void
}

export const Header = ({
  navItems,
  currentIndex
}: {
  navItems: NavItem[]
  currentIndex: number
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <div className={styles.header}>
      <div className={styles.nav + " " + (isExpanded ? styles.show : "")}>
        {navItems.map((item, index) => (
          <button
            key={index}
            disabled={item.disabled}
            className={
              (item.className ? item.className : "") +
              " " +
              (currentIndex == index ? styles.active : "")
            }
            onClick={item.onClick}
          >
            {item.text}
          </button>
        ))}
      </div>
      <div className={styles.expandButton} onClick={() => setIsExpanded(!isExpanded)}>
        <BurgerIcon />
      </div>
    </div>
  )
}
