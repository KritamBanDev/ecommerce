"use client";
import { Loader2, Search, X, Mic, TrendingUp, Clock } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { client } from "@/sanity/lib/client";
import { Input } from "../ui/input";
import AddToCartButton from "../AddToCartButton";
import { urlFor } from "@/sanity/lib/image";
import { Product } from "@/sanity.types";
import PriceView from "../PriceView";
import Image from "next/image";

// Add type definitions for SpeechRecognition and SpeechRecognitionEvent if not present
// These are not included in the default TypeScript DOM lib
// @ts-ignore
type SpeechRecognition = any;
// @ts-ignore
type SpeechRecognitionEvent = any;

const RECENT_SEARCHES_KEY = "recent_searches";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [trending, setTrending] = useState<Product[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [voiceActive, setVoiceActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Fetch trending products (top 5 by sales)
  useEffect(() => {
    async function fetchTrending() {
      try {
        const query = `*[_type == "product"] | order(sold desc)[0...5]`;
        const res = await client.fetch(query);
        setTrending(res);
      } catch {}
    }
    fetchTrending();
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) setRecentSearches(JSON.parse(stored));
  }, [showSearch]);

  // Save recent search
  const saveRecentSearch = (term: string) => {
    if (!term) return;
    const updated = [term, ...recentSearches.filter((s) => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  };

  // Fetch products from Sanity based on search input
  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == "product" && name match $search] | order(name asc)[0...10]`;
      const params = { search: `${search}*` };
      const response: Product[] = await client.fetch(query, params);
      setProducts(response);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  // Debounce input changes to reduce API calls
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 250);
    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  // Keyboard navigation
  useEffect(() => {
    if (!showSearch) return;
    const handler = (e: KeyboardEvent) => {
      if (!products.length) return;
      if (e.key === "ArrowDown") {
        setActiveIndex((i) => (i + 1) % products.length);
      } else if (e.key === "ArrowUp") {
        setActiveIndex((i) => (i - 1 + products.length) % products.length);
      } else if (e.key === "Enter" && activeIndex >= 0) {
        const prod = products[activeIndex];
        if (prod) {
          window.location.href = `/product/${prod.slug?.current ?? ""}`;
          setShowSearch(false);
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [products, activeIndex, showSearch]);

  // Focus input when dialog opens
  useEffect(() => {
    if (showSearch) setTimeout(() => inputRef.current?.focus(), 100);
    setActiveIndex(-1);
  }, [showSearch]);

  // Voice search setup
  useEffect(() => {
    // Use any for win and SpeechRecognition to avoid circular type reference
    const win = window as any;
    if (!win.webkitSpeechRecognition) return;
    const SpeechRecognition = win.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = 'en-US';
    recognitionRef.current.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearch(transcript);
      setVoiceActive(false);
    };
    recognitionRef.current.onend = () => setVoiceActive(false);
  }, []);

  const startVoiceSearch = () => {
    setVoiceActive(true);
    recognitionRef.current?.start();
  };

  // Highlight matched text
  const highlight = (text: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "ig");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-black rounded px-0.5">{part}</span>
      ) : (
        part
      )
    );
  };

  // Show suggestions, recent, or trending
  const showSuggestions = search && products.length > 0;
  const showRecent = !search && recentSearches.length > 0;
  const showTrending = !search && trending.length > 0;

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger
        onClick={() => setShowSearch(!showSearch)}
        className="flex items-center hover:cursor-pointer"
        aria-label="Open search"
      >
        <Search className="w-5 h-5 hover:text-darkColor hoverEffect" />
      </DialogTrigger>
      <DialogContent className="max-w-3xl min-h-[60vh] max-h-[90vh] flex flex-col overflow-hidden bg-white p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="mb-3 text-2xl font-bold flex items-center gap-2">
            Product Search
            <button
              type="button"
              aria-label="Voice search"
              className={`ml-2 p-1 rounded-full border border-gray-200 hover:bg-fuchsia-50 transition ${voiceActive ? 'bg-fuchsia-100' : ''}`}
              onClick={startVoiceSearch}
              disabled={voiceActive}
              tabIndex={0}
            >
              <Mic className={`w-5 h-5 ${voiceActive ? 'animate-pulse text-fuchsia-600' : ''}`} />
            </button>
          </DialogTitle>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <Input
              ref={inputRef}
              placeholder="Search for products, brands, categories..."
              className="flex-1 rounded-md py-5 font-semibold pr-12"
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearch(e.target.value);
                setActiveIndex(-1);
              }}
              aria-label="Search products"
              autoComplete="off"
              aria-describedby="search-desc"
            />
            <span id="search-desc" className="sr-only">Type to search for products. You can also use the microphone button for voice search.</span>
            {search && (
              <X
                onClick={() => setSearch("")}
                className="w-4 h-4 absolute top-3 right-11 hover:text-red-600 hoverEffect cursor-pointer"
                aria-label="Clear search"
              />
            )}
            <button
              type="submit"
              className="absolute right-0 top-0 bg-darkColor/10 w-10 h-full flex items-center justify-center rounded-tr-md hover:bg-darkColor hover:text-white hoverEffect"
              aria-label="Submit search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="w-full h-full overflow-y-auto border-t border-darkColor/10 bg-white" aria-live="polite">
          {loading ? (
            <div className="flex items-center justify-center py-10 text-green-600 font-semibold">
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
              Searching...
            </div>
          ) : showSuggestions ? (
            <div className="divide-y divide-gray-100">
              {products.map((product, idx) => (
                <div
                  key={product._id}
                  className={`flex items-center px-4 py-3 transition-colors cursor-pointer ${activeIndex === idx ? "bg-fuchsia-50 ring-2 ring-fuchsia-400" : "hover:bg-gray-50"}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => {
                    saveRecentSearch(search);
                    setShowSearch(false);
                    window.location.href = `/product/${product.slug?.current ?? ""}`;
                  }}
                  tabIndex={0}
                  aria-selected={activeIndex === idx}
                  role="option"
                  aria-label={product.name}
                >
                  <div className="h-14 w-14 flex-shrink-0 border border-darkColor/20 rounded-md overflow-hidden group bg-gray-100">
                    {product.images && (
                      <Image
                        width={56}
                        height={56}
                        src={urlFor(product.images[0]).url()}
                        alt={product.name || "Product image"}
                        className="object-cover w-full h-full group-hover:scale-110 hoverEffect"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="px-4 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-semibold text-gray-800 line-clamp-1">{highlight(product.name || "")}</h3>
                      <PriceView price={product.price} discount={product.discount} className="text-lg" />
                    </div>
                    <p className="text-xs text-gray-600 line-clamp-1">{highlight(product.intro || "")}</p>
                  </div>
                  <div className="hidden md:block w-32">
                    <AddToCartButton product={product} />
                  </div>
                </div>
              ))}
            </div>
          ) : showRecent ? (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
                <Clock className="w-4 h-4" /> Recent Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((item) => (
                  <button
                    key={item}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-fuchsia-100 transition"
                    onClick={() => setSearch(item)}
                    aria-label={`Search for ${item}`}
                  >
                    {item}
                  </button>
                ))}
                <button
                  className="ml-2 text-xs text-red-500 underline"
                  onClick={() => {
                    setRecentSearches([]);
                    localStorage.removeItem(RECENT_SEARCHES_KEY);
                  }}
                  aria-label="Clear recent searches"
                >
                  Clear
                </button>
              </div>
            </div>
          ) : showTrending ? (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-2 text-gray-700 font-semibold">
                <TrendingUp className="w-4 h-4" /> Trending Products
              </div>
              <div className="flex flex-wrap gap-4">
                {trending.map((product) => (
                  <div
                    key={product._id}
                    className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 hover:bg-fuchsia-50 transition cursor-pointer"
                    onClick={() => {
                      setShowSearch(false);
                      window.location.href = `/product/${product.slug?.current ?? ""}`;
                    }}
                    tabIndex={0}
                    role="option"
                    aria-label={product.name}
                  >
                    <div className="h-10 w-10 border border-darkColor/20 rounded-md overflow-hidden bg-white">
                      {product.images && (
                        <Image
                          width={40}
                          height={40}
                          src={urlFor(product.images[0]).url()}
                          alt={product.name || "Product image"}
                          className="object-cover w-full h-full"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-800 line-clamp-1">{product.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-10 font-semibold tracking-wide">
              {search ? (
                <p>
                  No products found for <span className="underline text-red-600">{search}</span>.
                </p>
              ) : (
                <p className="text-green-600 flex items-center justify-center gap-1">
                  <Search className="w-5 h-5" />
                  Search and explore your products from E-commerce.
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;