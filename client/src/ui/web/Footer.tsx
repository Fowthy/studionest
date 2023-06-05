import DarkModeToggle from './DarkModeToggle'

const Footer = () => {
  return (
    <footer className="flex w-full justify-end border-t bg-scale-300 p-4 bg-gray-50 dark:bg-gray-900">
      <DarkModeToggle />
    </footer>
  )
}

export default Footer
