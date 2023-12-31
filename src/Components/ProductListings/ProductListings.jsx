import { Fragment, useState, useEffect } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import Cards from './Cards';
import Pagination from './Pagination';
import axios from 'axios';

const subCategories = [
  { name: 'TVs, Audio & Video' },
  { name: 'Mobiles & Tablets' },
  { name: 'Computers & Laptops' },
  { name: 'Gaming Consoles' },
  { name: 'Cameras & Drones' },
  { name: 'Home Appliances' },
  { name: 'Car Electronics & GPS' },
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

function ProductListings() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const [data, setData] = useState({});

  const [filter, setFilter] = useState({ page: 1, sort: '', cat: '' });

  const fetchData = async (filter) => {
    const query = {};
    if (filter.page) query.page = filter.page;
    if (filter.sort) query.sort = filter.sort;
    if (filter.cat) query.cat = filter.cat;
    const res = await axios.get(
      `http://127.0.0.1:7000/api/v1/products?limit=12`,
      { params: query }
    );
    setData(res.data);
  };

  useEffect(() => {
    fetchData(filter);
  }, [filter]);

  return (
    <div className="bg-white">
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <form className="mt-4 border-t border-gray-200">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="px-2 py-3 font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href} className="block px-2 py-3 ">
                          {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <main className="max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            New Arrivals
          </h1>

          <div className="flex items-center">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Menu.Item>
                      <button
                        onClick={() => setFilter({ ...filter, sort: 'price' })}
                        className="px-4"
                      >
                        Low Price to High
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button
                        onClick={() => setFilter({ ...filter, sort: '-price' })}
                        className="px-4"
                      >
                        High Price to low
                      </button>
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <span className="sr-only">Filters</span>
              <FunnelIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="flex gap-x-8  ">
            {/* Filters */}
            <form className="hidden lg:block">
              <h3 className="mb-6 font-bold text-lg">Categories</h3>
              <ul
                role="list"
                className="space-y-4  border-gray-200 pb-6 text-sm font-medium text-gray-900"
              >
                {subCategories.map((category) => (
                  <li
                    key={category.name}
                    className="mb-2 text-sm hover:text-gray-500"
                  >
                    <div
                      className=" cursor-pointer"
                      onClick={() =>
                        setFilter({ ...filter, cat: category.name })
                      }
                    >
                      {category.name}
                    </div>
                  </li>
                ))}
              </ul>
            </form>
            <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6  lg:max-w-7xl lg:px-8">
              <Cards products={data.products} />
              <div className="flex justify-center mt-4">
                {/* <Pagination count={data.count} fetchData={fetchData} /> */}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default ProductListings;
