import React, { useEffect, useState, useRef} from 'react';
import { Search as SearchIcon } from 'react-feather'
import ItemSearchBox from './Product/ItemSearchBox';
import useDebounce from '../hooks/debounce';
import useResponsive from '../hooks/responsive.ts';
import Link from 'next/link'
/**
 * Cuando se comienza a escribir:
 * se activa el buscador en página en blanco con loader
 * muestra recomendaciones si es que hay, caso contrario se oculta el bloque
 * te manda a la página de producto o a la página de ver más productos según query
 */
const Search = ({
    name,
    placeholder,
    icon,
    ...props
}) => {
    const ref = useRef()
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [items, setItems] = useState([])
    const debouncedSearchTerm = useDebounce(search, 500);
    const [open, setOpen] = useState(false)
    const callService = async () => {
        const searchAPI = await fetch(
            process.env.NEXT_PUBLIC_URL_BASE + '/api/search?limit=6&q='+search
        )
        const json = await searchAPI.json()
        setItems(json.data)
        setLoading(false)
    }

    useEffect(() => {
        const checkIfClickedOutside = e => {
          if (open && ref.current && !ref.current.contains(e.target)) {
            setOpen(false)
          }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
          // Cleanup the event listener
          document.removeEventListener("mousedown", checkIfClickedOutside)
        }
      }, [open])

    useEffect(
        () => {
          setLoading(true)
          if (debouncedSearchTerm) {
            callService();
          } else {
            setItems([]);
          }
    }, [debouncedSearchTerm]);

    const renderItems = () => {
        if (loading) return ''
        if (items.length === 0) return <div className="padding">No se encontró sugerencias.</div>
        return (
            <div className="searchBox-floating-content">
                {
                    items.map(i => <ItemSearchBox onSelect={() => setOpen(false)} data={i} key={i.id} />)
                }
            </div>
        )
    }

    return ( 
        <div className="searchBox">
            {icon && <SearchIcon />}
            <input
                name={name}
                type="search"
                placeholder={placeholder}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => setOpen(true)}
                {...props}
            />
            {
                open && search.length > 0 &&  (
                <div className="searchBox-floating" ref={ref}>
                    {
                        loading && (<div className="padding">Cargando</div>)
                    }
                    {
                        renderItems()
                    }
                    {
                        items.length > 0 && (
                            <Link href={`/search?q=${search}`}>
                                <a>
                                    <div className="searchBox-floating-footer" onClick={() => setOpen(false)}>
                                        Ver mas productos
                                    </div>
                                </a>
                            </Link>
                        )
                    }
                </div>
                )
            }
        </div>
     );
}
 
export default Search;