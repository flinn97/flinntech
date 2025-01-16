import TextItem from "./textItem";
import AttributeItem from "./attributeItem";
import CustomComponentItem from "./customComponentItem";
import ImgItem from "./imgItem";
import FormItem from "./formItem";
import DelItem from "./del/deleteItem";
import EditItem from "./edit/editItem";
import MapComponentItem from "./mapComponent";
import React from "react";
import DelIconItem from "./del/delCustomItem";
import DelTextItem from "./del/delTextItem";
import DelCustomItem from "./del/delCustomItem";
import EditIconItem from "./edit/editIconItem";
import EditCustomItem from "./edit/editCustomItem";
import InteractiveMap from "./interactiveMap/interactiveMapComponent";
import AddComponentButton from "./interactiveMap/addButtonComponent";
import PlainDisplay from "./plainDisplay";

import SelectorAttributeItem from "./selectorAttributeItem";
import LogoItem from "./navMap/logoItem";
import LinkContainer from "./navMap/linksContainer";
import LinkItem from "./navMap/linkItem";
import Logout from "./navMap/logout";
import { MapComponent } from "./mapComponentInterface";
import BaseReactFactory from "../templateTech/factories/baseReactFactory";
import OrderedArrowsBaseClass from "./orderedListComponets/arrows";
import InnerMap from "./fileHierarchyMap/innerMap";
import AvaBackgroundImage from "./coolComponents/avaBackgroundImage";
import CustomBuiltItem from "./customBuiltItem";

/**
 * factory for getting different items for the map component
 */
export default class MapFactory extends BaseReactFactory {
    factory = {
        text: TextItem,
        attribute: AttributeItem,
        custom: CustomComponentItem,
        customBuilt: CustomBuiltItem,
        img: ImgItem,
        form: FormItem,
        del: DelItem,
        delIcon: DelIconItem,
        delCustom:DelCustomItem,
        delText:DelTextItem,
        edit: EditItem,
        editIcon: EditIconItem,
        editCustom: EditCustomItem,
        interactiveMap: InteractiveMap,
        addComponentButton: AddComponentButton,
        plain: PlainDisplay,
        select:SelectorAttributeItem,
        logo:LogoItem,
        links: LinkContainer,
        linkItem: LinkItem,
        logout: Logout,
        default:MapComponent,
        map: MapComponentItem,
        order:OrderedArrowsBaseClass,
        innerMap: InnerMap,
        backgroundImage:AvaBackgroundImage




    }


}

