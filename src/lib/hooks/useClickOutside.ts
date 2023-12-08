import { useEffect } from 'react'


///    const popover = useRef<HTMLDivElement | null>(null)
   // const close = () => {toggle(!isOpen)}
   // useClickOutside(popover, close)              <------ this code needs to be on UI side


// Improved version of https://usehooks.com/useOnClickOutside/
const useClickOutside = (
   ref: React.MutableRefObject<HTMLDivElement | null>,
   handler: () => void
) => {
   useEffect(() => {
      let startedInside : null | boolean = false
      let startedWhenMounted: null | boolean | HTMLElement = false

      const listener = <T extends MouseEvent>(event: T) => {
         // Do nothing if `mousedown` or `touchstart` started inside ref element
         
         if (startedInside || !startedWhenMounted) return
         // Do nothing if clicking ref's element or descendent elements
         if (!ref.current || ref.current.contains(event.target as HTMLElement))
            return

         handler()
      }

      const validateEventStart = <T extends TouchEvent | MouseEvent>(
         event: T
      ) => {

         startedWhenMounted = ref.current
         startedInside =
            ref.current && ref.current.contains(event.target as HTMLElement)
         console.log(startedInside, startedWhenMounted)
         }

      document.addEventListener('mousedown', validateEventStart)
      document.addEventListener('touchstart', validateEventStart)
      document.addEventListener('click', listener)

      return () => {
         document.removeEventListener('mousedown', validateEventStart)
         document.removeEventListener('touchstart', validateEventStart)
         document.removeEventListener('click', listener)
      }
   }, [ref, handler])
}

export default useClickOutside
