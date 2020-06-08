<? 
// AJAX add to cart.    
function add_one_product() {        
    ob_start();
    $product_id = apply_filters('woocommerce_add_to_cart_product_id', absint($_POST['product_id']));
    $quantity          = empty($_POST['quantity']) ? 1 : wc_stock_amount($_POST['quantity']);
    $passed_validation = apply_filters( 'woocommerce_add_to_cart_validation', true, $product_id, $quantity );
    $product_status    = get_post_status( $product_id );
    if ( $passed_validation && WC()->cart->add_to_cart( $product_id, $quantity ) && 'publish' === $product_status ) {
        do_action( 'woocommerce_ajax_added_to_cart', $product_id );
        wc_add_to_cart_message( $product_id );
        wp_send_json_success();
    } else {
        $data = array(
            'error'       => true,
            'product_url' => apply_filters( 'woocommerce_cart_redirect_after_error', get_permalink( $product_id ), $product_id )
        );
        wp_send_json( $data );
    }
    die();
}
add_action('wp_ajax_add_one_product', 'add_one_product');
add_action('wp_ajax_nopriv_add_one_product', 'add_one_product');

//Модификация woo rest api для product
function custom_api_product_response($data, $object){
    global $_wp_additional_image_sizes;
    unset($data->data['date_created']);
    unset($data->data['meta_data']);
    unset($data->data['description']);
    unset($data->data['price_html']);
    // unset($data->data['attributes']);
    unset($data->data['date_created_gmt']);
    unset($data->data['date_modified']);
    unset($data->data['date_modified_gmt']);
    unset($data->data['type']);
    unset($data->data['status']);
    unset($data->data['featured']);
    unset($data->data['catalog_visibility']);
    unset($data->data['short_description']);
    unset($data->data['sku']);
    unset($data->data['date_on_sale_from']);
    unset($data->data['date_on_sale_from_gmt']);
    unset($data->data['date_on_sale_to']);
    unset($data->data['date_on_sale_to_gmt']);
    unset($data->data['on_sale']);
    unset($data->data['purchasable']);
    unset($data->data['total_sales']);
    unset($data->data['virtual']);
    unset($data->data['downloadable']);
    unset($data->data['downloads']);
    unset($data->data['download_limit']);
    unset($data->data['download_expiry']);
    unset($data->data['external_url']);
    unset($data->data['button_text']);
    unset($data->data['tax_status']);
    unset($data->data['tax_class']);
    unset($data->data['manage_stock']);
    unset($data->data['stock_quantity']);
    unset($data->data['stock_status']);
    unset($data->data['backorders']);
    unset($data->data['backorders_allowed']);
    unset($data->data['backordered']);
    unset($data->data['sold_individually']);
    unset($data->data['weight']);
    unset($data->data['dimensions']);
    unset($data->data['shipping_required']);
    unset($data->data['shipping_taxable']);
    unset($data->data['shipping_class']);
    unset($data->data['shipping_class_id']);
    unset($data->data['reviews_allowed']);
    unset($data->data['average_rating']);
    unset($data->data['rating_count']);
    unset($data->data['related_ids']);
    unset($data->data['upsell_ids']);
    unset($data->data['cross_sell_ids']);
    unset($data->data['parent_id']);
    unset($data->data['purchase_note']);
    // unset($data->data['categories']);
    foreach ($data->data['images'] as $key => $image) {
        $image_urls = [];
        foreach ($_wp_additional_image_sizes as $size => $value) {
            $image_info = wp_get_attachment_image_src($image['id'], $size);
            $data->data['images'][$key][$size] = $image_info[0];
        }
    }
    return $data;
}
add_filter( 'woocommerce_rest_prepare_product_object', 'custom_api_product_response', 10, 2 );

//Получение продуктов
function getProducts(WP_REST_Request $request) {
    function roundArray($n){
        return round($n, 1);
    };
    if(isset ($_GET)){
        $current_search = $_GET['search'];
        $current_product_cat = $_GET['product-cat'];
        $current_items_order_by = $_GET['order_by'];
        $current_paged = $_GET['paged'];
        $include = $_GET['include'];
        
        $current_colors = $_GET['colors'] ? explode( ',', $_GET['colors']) : [];
        $cvet = $_GET['cvet'] ? explode( ',', $_GET['cvet']) : [];
        $dlina = $_GET['dlina'] ? explode( ',', $_GET['dlina']) : [];
        $dlina_max = $_GET['dlina_max'] ? explode( ',', $_GET['dlina_max']) : [];
        $dvuxyarusnye = $_GET['dvuxyarusnye'] ? explode( ',', $_GET['dvuxyarusnye']) : [];
        $forma = $_GET['forma'] ? explode( ',', $_GET['forma']) : [];
        $glubina = $_GET['glubina'] ? explode( ',', $_GET['glubina']) : [];
        $material_fasada = $_GET['material_fasada'] ? explode( ',', $_GET['material_fasada']) : [];
        $material_karkasa = $_GET['material_karkasa'] ? explode( ',', $_GET['material_karkasa']) : [];
        $material_obivki = $_GET['material_obivki'] ? explode( ',', $_GET['material_obivki']) : [];
        $mexanizm = $_GET['mexanizm'] ? explode( ',', $_GET['mexanizm']) : [];
        $napolnenie = $_GET['napolnenie'] ? explode( ',', $_GET['napolnenie']) : [];
        $obivka = $_GET['obivka'] ? explode( ',', $_GET['obivka']) : [];
        $osnovanie = $_GET['osnovanie'] ? explode( ',', $_GET['osnovanie']) : [];
        $osobennosti = $_GET['osobennosti'] ? explode( ',', $_GET['osobennosti']) : [];
        $raskladka = $_GET['raskladka'] ? explode( ',', $_GET['raskladka']) : [];
        $raskladnoj = $_GET['raskladnoj'] ? explode( ',', $_GET['raskladnoj']) : [];
        $razmer = $_GET['razmer'] ? explode( ',', $_GET['razmer']) : [];
        $s_yashhikom = $_GET['s_yashhikom'] ? explode( ',', $_GET['s_yashhikom']) : [];
        $shirina = $_GET['shirina'] ? explode( ',', $_GET['shirina']) : [];
        $sidene = $_GET['sidenes'] ? explode( ',', $_GET['sidene']) : [];
        $so_spalnym_mestom = $_GET['so_spalnym_mestom'] ? explode( ',', $_GET['so_spalnym_mestom']) : [];
        $spalnoe_mesto_dlina = $_GET['spalnoe_mesto_dlina'] ? explode( ',', $_GET['spalnoe_mesto_dlina']) : [];
        $spalnoe_mesto_shirina = $_GET['spalnoe_mesto_shirina'] ? explode( ',', $_GET['spalnoe_mesto_shirina']) : [];
        $stil = $_GET['stil'] ? explode( ',', $_GET['stil']) : [];
        $stoleshnica = $_GET['stoleshnica'] ? explode( ',', $_GET['stoleshnica']) : [];
        $strana_proizvodstva = $_GET['strana_proizvodstva'] ? explode( ',', $_GET['strana_proizvodstva']) : [];
        $tip = $_GET['tip'] ? explode( ',', $_GET['tip']) : [];
        $tolshhina = $_GET['tolshhina'] ? explode( ',', $_GET['tolshhina']) : [];
        $vid = $_GET['vid'] ? explode( ',', $_GET['vid']) : [];
        $vysota = $_GET['vysota'] ? explode( ',', $_GET['vysota']) : [];
        $zamki = $_GET['zamki'] ? explode( ',', $_GET['zamki']) : [];
        $zhestkost = $_GET['zhestkost'] ? explode( ',', $_GET['zhestkost']) : [];
     
        $args = array(
            'post_status' => 'publish',
            'post_type' => array('product', 'product_variation'),
            'post_type' => 'product',
            'posts_per_page' => 16,  
            's' => $current_search,
            'paged' => ( $current_paged ? $current_paged : 1 ),
        );
        if($include){
            $args['post__in'] = explode( ',', $include);
        }
        $args['tax_query'] =  array('relation' => 'AND');
        $args['meta_query'] =  array('relation' => 'AND');

        if (isset($current_product_cat)  && !(empty($current_product_cat)) && !is_null($current_product_cat) && !($current_product_cat=="null")) {
            $request_params = array(
                'taxonomy' => 'product_cat',
                'field' => 'slug',
                'terms' => $current_product_cat
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($current_colors)  && !(empty($current_colors))) {
            $request_params = array(
                'taxonomy' => 'pa_colors',
                'field' => 'slug',
                'terms' => $current_colors,
            );
            array_push($args['tax_query'], $request_params); 
        }
        
        if (isset($cvet)  && !(empty($cvet))) {
            $request_params = array(
                'taxonomy' => 'pa_cvet',
                'field' => 'slug',
                'terms' => $cvet,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($dlina)  && !(empty($dlina))) {
            $request_params = array(
                'taxonomy' => 'pa_dlina',
                'field' => 'slug',
                'terms' => $dlina,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($dlina_max)  && !(empty($dlina_max))) {
            $request_params = array(
                'taxonomy' => 'pa_dlina-max',
                'field' => 'slug',
                'terms' => $dlina_max,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($dvuxyarusnye)  && !(empty($dvuxyarusnye))) {
            $request_params = array(
                'taxonomy' => 'pa_dvuxyarusnye',
                'field' => 'slug',
                'terms' => $dvuxyarusnye,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($forma)  && !(empty($forma))) {
            $request_params = array(
                'taxonomy' => 'pa_forma',
                'field' => 'slug',
                'terms' => $forma,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($glubina)  && !(empty($glubina))) {
            $request_params = array(
                'taxonomy' => 'pa_glubina',
                'field' => 'slug',
                'terms' => $glubina,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($material_fasada)  && !(empty($material_fasada))) {
            $request_params = array(
                'taxonomy' => 'pa_material-fasada',
                'field' => 'slug',
                'terms' => $material_fasada,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($material_karkasa)  && !(empty($material_karkasa))) {
            $request_params = array(
                'taxonomy' => 'pa_material-karkasa',
                'field' => 'slug',
                'terms' => $material_karkasa,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($material_obivki)  && !(empty($material_obivki))) {
            $request_params = array(
                'taxonomy' => 'pa_material-obivki',
                'field' => 'slug',
                'terms' => $material_obivki,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($mexanizm)  && !(empty($mexanizm))) {
            $request_params = array(
                'taxonomy' => 'pa_mexanizm',
                'field' => 'slug',
                'terms' => $mexanizm,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($napolnenie)  && !(empty($napolnenie))) {
            $request_params = array(
                'taxonomy' => 'pa_napolnenie',
                'field' => 'slug',
                'terms' => $napolnenie,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($obivka)  && !(empty($obivka))) {
            $request_params = array(
                'taxonomy' => 'pa_obivka',
                'field' => 'slug',
                'terms' => $obivka,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($osnovanie)  && !(empty($osnovanie))) {
            $request_params = array(
                'taxonomy' => 'pa_osnovanie',
                'field' => 'slug',
                'terms' => $osnovanie,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($osobennosti)  && !(empty($osobennosti))) {
            $request_params = array(
                'taxonomy' => 'pa_osobennosti',
                'field' => 'slug',
                'terms' => $osobennosti,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($raskladka)  && !(empty($raskladka))) {
            $request_params = array(
                'taxonomy' => 'pa_raskladka',
                'field' => 'slug',
                'terms' => $raskladka,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($raskladnoj)  && !(empty($raskladnoj))) {
            $request_params = array(
                'taxonomy' => 'pa_raskladnoj',
                'field' => 'slug',
                'terms' => $raskladnoj,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($razmer)  && !(empty($razmer))) {
            $request_params = array(
                'taxonomy' => 'pa_razmer',
                'field' => 'slug',
                'terms' => $razmer,
            );
            array_push($args['tax_query'], $request_params); 
        }

        if (isset($s_yashhikom)  && !(empty($s_yashhikom))) {
            $request_params = array(
                'taxonomy' => 'pa_s-yashhikom',
                'field' => 'slug',
                'terms' => $s_yashhikom,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($shirina)  && !(empty($shirina))) {
            $request_params = array(
                'taxonomy' => 'pa_shirina',
                'field' => 'slug',
                'terms' => $shirina,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($sidene)  && !(empty($sidene))) {
            $request_params = array(
                'taxonomy' => 'pa_sidene',
                'field' => 'slug',
                'terms' => $sidene,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($so_spalnym_mestom)  && !(empty($so_spalnym_mestom))) {
            $request_params = array(
                'taxonomy' => 'pa_so-spalnym-mestom',
                'field' => 'slug',
                'terms' => $so_spalnym_mestom,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($spalnoe_mesto_dlina)  && !(empty($spalnoe_mesto_dlina))) {
            $request_params = array(
                'taxonomy' => 'pa_spalnoe-mesto-dlina',
                'field' => 'slug',
                'terms' => $spalnoe_mesto_dlina,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($spalnoe_mesto_shirina)  && !(empty($spalnoe_mesto_shirina))) {
            $request_params = array(
                'taxonomy' => 'pa_spalnoe-mesto-shirina',
                'field' => 'slug',
                'terms' => $spalnoe_mesto_shirina,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($stil)  && !(empty($stil))) {
            $request_params = array(
                'taxonomy' => 'pa_stil',
                'field' => 'slug',
                'terms' => $stil,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($stoleshnica)  && !(empty($stoleshnica))) {
            $request_params = array(
                'taxonomy' => 'pa_stoleshnica',
                'field' => 'slug',
                'terms' => $stoleshnica,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($strana_proizvodstva)  && !(empty($strana_proizvodstva))) {
            $request_params = array(
                'taxonomy' => 'pa_strana-proizvodstva',
                'field' => 'slug',
                'terms' => $strana_proizvodstva,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($tip)  && !(empty($tip))) {
            $request_params = array(
                'taxonomy' => 'pa_tip',
                'field' => 'slug',
                'terms' => $tip,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($tolshhina)  && !(empty($tolshhina))) {
            $request_params = array(
                'taxonomy' => 'pa_tolshhina',
                'field' => 'slug',
                'terms' => $tolshhina,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($vid)  && !(empty($vid))) {
            $request_params = array(
                'taxonomy' => 'pa_vid',
                'field' => 'slug',
                'terms' => $vid,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($vysota)  && !(empty($vysota))) {
            $request_params = array(
                'taxonomy' => 'pa_vysota',
                'field' => 'slug',
                'terms' => $vysota,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($zamki)  && !(empty($zamki))) {
            $request_params = array(
                'taxonomy' => 'pa_zamki',
                'field' => 'slug',
                'terms' => $zamki,
            );
            array_push($args['tax_query'], $request_params); 
        }
        if (isset($zhestkost)  && !(empty($zhestkost))) {
            $request_params = array(
                'taxonomy' => 'pa_zhestkost',
                'field' => 'slug',
                'terms' => $zhestkost,
            );
            array_push($args['tax_query'], $request_params); 
        }

        $result = new WP_Query($args);
        $products = [];
        function price_array($price){
            $del = array('<span class="woocommerce-Price-amount amount">', '<span class="woocommerce-Price-currencySymbol">' ,'</span>','<del>','<ins>', '&#8381;');
            $price = str_replace($del, '', $price);
            $price = str_replace('</del>', '|', $price);
            $price = str_replace('</ins>', '|', $price);
            $price_arr = explode('|', $price);
            $price_arr = array_filter($price_arr);
            return $price_arr;
        }
        foreach ($result->posts as $post) {
            $productInstance = new WC_Product($post->ID);
            $product = (object)[];
            $product->id = $post->ID;
            $product->slug = $post->post_name;
            $product->name = $post->post_title;
            $product->permalink = get_permalink($post->ID);
            $product->regular_price = $productInstance->get_regular_price();
            $product->sale_price = $productInstance->get_sale_price();
            $product->images = [];   
            //product_tag
            $terms_product_tag = get_the_terms( $post->ID, 'product_tag' );
            $term_array_product_tag = array();
            if ( ! empty( $terms_product_tag ) && ! is_wp_error( $terms_product_tag ) ){
                foreach ( $terms_product_tag as $term ) {
                    $term_array_product_tag[] = $term->name;
                }
            }
            $product->product_tags = $term_array_product_tag;
            $sizes_attributes = $productInstance->get_attribute( 'sizes' );
            $product->sizes_attributes = $sizes_attributes;
            $price_html = $productInstance->get_price_html();
            $product->price_html = price_array($price_html);
            global $_wp_additional_image_sizes;
            foreach ($_wp_additional_image_sizes as $size => $value) {
                $image_info = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), $size);
                $product->images[0][$size] = $image_info[0];
            }
            $product->acf = get_fields($post->ID);
            array_push($products, $product);
        }
        $response = (object)[];
        $response->posts = $products;
        $response->max_num_pages = $result->max_num_pages;
        $response->found_posts = $result->found_posts;
        $response->post_count = $result->post_count;
        $response->current_post = $result->current_post;
        wp_send_json_success( $response , 200 );
    }
    wp_send_json_error('Ошибка при получение значений продуктов');
}
add_action( 'rest_api_init', function () {
    register_rest_route( 'amadreh/v1/', '/get-products', array(
          'methods' => WP_REST_Server::READABLE,
          'callback' => 'getProducts',
      ) );
});

//установка количества продукта в корзине по cart id
function set_item_from_cart_by_cart_id() {
    $cart = WC()->instance()->cart;
    $cart_id = $_POST['cart_id'];
    $product_quantity = $_POST['product_quantity'];
    $cart_item_id = $cart->find_product_in_cart($cart_id);
    if($cart_item_id){
       $cart->set_quantity($cart_item_id, $product_quantity);
       $data = array(
            'subtotal'   => $cart->subtotal,
        );
       wp_send_json_success($data);
    } 
    wp_send_json_error();
}
add_action('wp_ajax_set_item_from_cart_by_cart_id', 'set_item_from_cart_by_cart_id');
add_action('wp_ajax_nopriv_set_item_from_cart_by_cart_id', 'set_item_from_cart_by_cart_id');


function my_array_unique($array, $keep_key_assoc = false){
    $duplicate_keys = array();
    $tmp = array();       

    foreach ($array as $key => $val){
        // convert objects to arrays, in_array() does not support objects
        if (is_object($val))
            $val = (array)$val;

        if (!in_array($val, $tmp))
            $tmp[] = $val;
        else
            $duplicate_keys[] = $key;
    }

    foreach ($duplicate_keys as $key)
        unset($array[$key]);

    return $keep_key_assoc ? $array : array_values($array);
}
//Получение атрибутов
function getTermByCategory(WP_REST_Request $request) {
    if(isset ($_GET)){
        $taxonomyID = $request['taxonomy_id'];
        $attrName = $request['attr_name'];

        if($taxonomyID !== 'null'){
            $args = array(
                'numberposts' => -1,
                'post_status' => 'published',
                'post_type' => 'product',
                'tax_query' => array(
                array(
                'taxonomy' => 'product_cat',
                'field' => 'slug',
                'terms' => $taxonomyID
                )
                )
            );
        }
        else{
            $args = ['post_status' => 'published','post_type' => 'product','numberposts' => -1]; 
        }

        $term_objects = [];
        $products = new WP_Query($args);
        while( $products->have_posts() ){
            $products->the_post();
            $post_id = get_the_ID();
            $product = wc_get_product($post_id);
            foreach( $product->get_attributes() as $attr_name => $attr ){
                if ($attrName == $attr_name) {
                    foreach( $attr->get_terms() as $term ){
                        $term_object = (object)[];
                        $term_object->id = $term->term_id;
                        $term_object->slug = $term->slug;
                        $term_object->name = $term->name;

                        // $image = get_field('color', 'pa_cvet_'.$term->term_id);
                        // $hex = get_field('hex', 'pa_cvet_'.$term->term_id);
                        // $term_object->image = $image;
                        // $term_object->hex = $hex;
  
    
                        $term_object->attr_name = $attr_name;
                        array_push($term_objects, $term_object);
                    }
                }
            }
        }
        $response = (object)[];
        $response = my_array_unique($term_objects);
        wp_send_json( $response , 200 );
    }
    wp_send_json_error('Ошибка');
}

add_action( 'rest_api_init', function () {
    register_rest_route( 'optiko/v1/', '/get-terms-by-category', array(
          'methods' => WP_REST_Server::READABLE,
          'callback' => 'getTermByCategory',
      ) );
});