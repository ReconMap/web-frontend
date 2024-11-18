export default function BadgeOutline({ children, color = "text-color", fontSize = "fontSizeXsmall", icon }) {
    const styles = {
        badge: {
            color: `var(--${color})`,
            padding: `var(--paddingBadge)`,
            alignItems: "center",
            display: `inline-flex`,
            fontSize: `var(--${fontSize})`,
        },
    };
    return (
        <span style={styles.badge}>
            {icon}
            {children}
        </span>
    );
}